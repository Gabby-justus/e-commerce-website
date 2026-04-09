import { useCart} from '../context/CartContext';


export default function Checkout() {
    const { 
        getCartItemsWithProducts, 
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        getCartTotal,
        clearCart,
    } = useCart();
    const cartItems = getCartItemsWithProducts();

    const total = getCartTotal();

    function placeOrder() {
        alert('Order placed successfully!');
        clearCart();
    }
    return (
            <div className='page'>
                <div className='container'>
                    <h1 className='page-title'>Checkout</h1>
                    <div className='checkout-container' >
                        <div className="checkout-items">
                            <h2 className="checkout-section-title">Order Summary</h2>
                            {cartItems.map(item => (
                                <div key={item.productId}className="checkout-item">
                                   <img 
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="checkout-item-image"
                                    />
                                    <div className="checkout-item-details">
                                        <h3 className="checkout-item-name">{item.product.name}</h3>
                                        <p className="checkout-item-quantity">Quantity: {item.quantity}</p>
                                        <p className="checkout-item-price">Price: ${item.product.price}each</p>
                                    </div>
                                    <div className="checkout-item-controls">
                                        <div className="quantity-control">
                                            <button className="quantity-btn"
                                            onClick={() => decreaseQuantity(item.productId)}>-</button>
                                            <span className="quantity-value">{item.quantity}</span>
                                            <button className="quantity-btn"
                                            onClick={() => increaseQuantity(item.productId)}>+</button>
                                        </div>
                                        <p className='checkout-item-total'>Total: ${ (item.quantity * item.product.price).toFixed(2) }</p>
                                        <button className="btn btn-secondary btn-small"
                                        onClick={() => removeFromCart(item.productId)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="checkout-summary">
                            <h2 className="checkout-section-title">Total</h2>
                            <p className="checkout-summary-total">Total: ${total.toFixed(2)}</p>
                            <button className="btn btn-primary btn-block" onClick={placeOrder}>Place Order</button>
                        
                    </div>
                    </div>  
                </div>
            </div>
);
}