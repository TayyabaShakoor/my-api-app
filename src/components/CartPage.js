// src/components/CartPage.js
import useCartStore from '../store/cartStore';
import './CartPage.css';
import toast from 'react-hot-toast';

function CartPage() {
  const { cart, totalItems, totalPrice, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCartStore();

  const handleRemove = (productId, productTitle) => {
    removeFromCart(productId);
    toast.error(`🗑️ ${productTitle.slice(0, 30)}... removed from cart`, {
      style: {
        background: '#e53e3e',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '12px',
        fontSize: '16px',
      },
    });
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="empty-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Start adding some amazing products!</p>
          <button onClick={() => window.scrollTo(0, 0)} className="shop-now-btn">
            🛍️ Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>🛒 Your Shopping Cart</h2>
        <div className="cart-summary">
          <span>Items: <strong>{totalItems}</strong></span>
          <span>Total: <strong>${totalPrice.toFixed(2)}</strong></span>
          <button onClick={clearCart} className="clear-cart-btn">
            🗑️ Clear All
          </button>
        </div>
      </div>

      <div className="cart-items-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-item-card">
            <img 
              src={item.image} 
              alt={item.title} 
              className="cart-item-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/80/667eea/ffffff?text=No+Image';
              }}
            />
            
            <div className="cart-item-details">
              <h4>{item.title}</h4>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
              <p className="cart-item-category">{item.category}</p>
            </div>

            <div className="cart-item-actions">
              <div className="quantity-controls">
                <button 
                  onClick={() => decreaseQuantity(item.id)}
                  className="qty-btn"
                >
                  −
                </button>
                <span className="qty-number">{item.quantity}</span>
                <button 
                  onClick={() => increaseQuantity(item.id)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
              
              <p className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              
              <button 
                onClick={() => handleRemove(item.id, item.title)}
                className="remove-item-btn"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-grand-total">
          <h3>Grand Total</h3>
          <h2>${totalPrice.toFixed(2)}</h2>
        </div>
        <button className="checkout-btn">
          ✅ Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;