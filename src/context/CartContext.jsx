import { createContext, useState, useContext } from "react";
import {getProductById} from "../data/products";

export const CartContext = createContext(null);

export default function CartProvider({children }) {
    const [cartItems, setCartItems] = useState([]);

     function addToCart(productId) {

        const existing = cartItems.find(item => item.productId === productId);

        if (existing) {

            setCartItems(cartItems.map(item => 
                item.productId === productId ? {...item, quantity: item.quantity + 1} : item
            ));
           
        } else {
            setCartItems([...cartItems, {productId, quantity: 1}]);
        }
    }
 function increaseQuantity(productId) {
        setCartItems(cartItems.map(item => 
            item.productId === productId ? {...item, quantity: item.quantity + 1} : item
        ).filter(item => item.quantity > 0));
    }
    function decreaseQuantity(productId) {
        setCartItems(
            cartItems
            .map(item => 
                item.productId === productId 
                    ? {...item, quantity: item.quantity - 1} : 
                    item)
                .filter(item => item.quantity > 0));
    } 
    
    function removeFromCart(productId) {
        setCartItems(cartItems.filter(item => item.productId !== productId));
    }

    function getCartItemsWithProducts() {
    return cartItems
        .map(item => {
            const product = getProductById(item.productId);

            if (!product) return null;

            return {
                ...item,
                product
            };
        })
        .filter(Boolean);
}

    function getCartTotal() {
        const total = cartItems.reduce((total, item) => {
            const product = getProductById(item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
        return total;
    }

    function clearCart() {
        setCartItems([]);
    }

    return (
    <CartContext.Provider value={{ 
        cartItems, 
        addToCart, 
        getCartItemsWithProducts, 
        increaseQuantity, 
        decreaseQuantity, 
        removeFromCart,
        getCartTotal,
        clearCart,
        }}>
        {children}
    </CartContext.Provider>

    
    );
}
            //custom hook to use auth context

export function useCart() {
    const context = useContext(CartContext);

    return context;
}