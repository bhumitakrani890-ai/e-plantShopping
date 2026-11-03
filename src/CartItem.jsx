import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNumber = parseFloat(item.cost.replace('$', ''));
      return total + costNumber * item.quantity;
    }, 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container" style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        {cart.map(item => (
          <div className="cart-item" key={item.name} style={{ display: 'flex', gap: '20px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '80%', maxWidth: '500px', alignItems: 'center' }}>
            <img className="cart-item-image" src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            <div className="cart-item-details" style={{ textAlign: 'left', flexGrow: 1 }}>
              <div className="cart-item-name" style={{ fontWeight: 'bold' }}>{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity" style={{ margin: '10px 0' }}>
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value" style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">
                Subtotal: ${(parseFloat(item.cost.replace('$', '')) * item.quantity).toFixed(2)}
              </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)} style={{ marginTop: '5px', backgroundColor: '#d9534f', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <button className="get-started-btn" onClick={onContinueShopping} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Continue Shopping</button>
        <button className="get-started-btn" onClick={handleCheckoutShopping} style={{ padding: '10px 20px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
