// src/components/AddProductForm.js
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../schemas/productSchema';
import useCartStore from '../store/cartStore';
import toast from 'react-hot-toast';
import './AddProductForm.css'; // Import CSS

function AddProductForm() {
  const addToCart = useCartStore((state) => state.addToCart);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      price: '',
      description: '',
      category: '',
      image: '',
    },
  });

  const onSubmit = (data) => {
    const newProduct = {
      id: Date.now(),
      title: data.title,
      price: parseFloat(data.price),
      description: data.description,
      category: data.category,
      image: data.image || 'https://via.placeholder.com/150/667eea/ffffff?text=New',
      rating: {
        rate: 0,
        count: 0,
      },
    };

    addToCart(newProduct);
    reset();
    
    toast.success(`✅ ${newProduct.title} added to cart!`, {
      style: {
        background: '#48bb78',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '12px',
        fontSize: '16px',
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="product-form">
      <h2>➕ Add New Product</h2>

      <div className="form-group">
        <label>Product Title <span className="required">*</span></label>
        <input
          type="text"
          {...register('title')}
          className={errors.title ? 'error' : ''}
          placeholder="Enter product title"
        />
        {errors.title && (
          <span className="error-message">{errors.title.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Price ($) <span className="required">*</span></label>
        <input
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          className={errors.price ? 'error' : ''}
          placeholder="Enter price"
        />
        {errors.price && (
          <span className="error-message">{errors.price.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Description <span className="required">*</span></label>
        <textarea
          {...register('description')}
          className={errors.description ? 'error' : ''}
          placeholder="Enter product description"
          rows="3"
        />
        {errors.description && (
          <span className="error-message">{errors.description.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Category <span className="required">*</span></label>
        <select
          {...register('category')}
          className={errors.category ? 'error' : ''}
        >
          <option value="">Select a category</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
        {errors.category && (
          <span className="error-message">{errors.category.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Image URL (Optional)</label>
        <input
          type="url"
          {...register('image')}
          className={errors.image ? 'error' : ''}
          placeholder="https://example.com/image.jpg"
        />
        {errors.image && (
          <span className="error-message">{errors.image.message}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '⏳ Adding...' : '➕ Add to Cart'}
      </button>
    </form>
  );
}

export default AddProductForm;