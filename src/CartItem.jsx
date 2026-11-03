import React from 'react';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = [];

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseFloat(item.cost.substring(1)) * item.quantity, 0);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec">-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc">+</button>
              </div>
              <div className="cart-item-total">Total: ${parseFloat(item.cost.substring(1)) * item.quantity}</div>
              <button className="cart-item-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button className="get-started-btn" onClick={(e) => onContinueShopping(e)}>Continue Shopping</button>
      <button className="get-started-btn" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
    </div>
  );
};

export default CartItem;
