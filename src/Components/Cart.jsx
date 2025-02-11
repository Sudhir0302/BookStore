import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import LoginPopup from './LoginPopup.jsx';
import OrderPopup from './OrderPopup.jsx'; 
import SuccessPopup from './Successpopup.jsx'; 
import Navbar from './Navbar.jsx';

const Cart = () => {
    const { isLogin, user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [cartid, setCartid] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null); 

    const totalPrice = cartItems.reduce((total, book) => total + book.price, 0);

    const handleRemove = (index) => {
        axios.delete("http://localhost:5000/user/deletecart", {
            data: { userId: user._id, index }
        })
        .then(res => {
            console.log(res.data); 
            const updatedCart = cartItems.filter((_, i) => i !== index);
            setCartItems(updatedCart);
        })
        .catch(error => {
            console.error(error.message); 
        });
        
        console.log(index); 
    };

    const handleOrder = (e) => {
        e.preventDefault();
        if (isLogin) {
            setIsPopupOpen(true); // Open the order popup
        }
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false); // Close the order popup
    };

    const handleSubmitOrder = (userDetails) => {
        // Handle order submission with user details
        console.log("Order placed with details:", userDetails);
        
        // Store user and cart details to show in the success popup
        const orderData = {
            userDetails,
            cartItems,
            totalPrice
        };
        setOrderDetails(orderData);

        setIsPopupOpen(false); // Close the order popup
        setIsSuccessPopupOpen(true); // Open the success popup
    };

    const handleCloseSuccessPopup = () => {
        setIsSuccessPopupOpen(false); // Close the success popup
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            if (user && user._id) {
                try {
                    const response = await axios.get(`http://localhost:5000/user/getcart/${user._id}`);
                    setCartItems(response.data?.cart.cart_items || []); // Set local cart items
                    setCartid(response.data?.cart.cart_items);
                    console.log(cartid);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [user]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!isLogin)
        return (
            <>
                <LoginPopup onClose={handleClosePopup} />
            </>
        );

    return (
        <>
        <Navbar />
        <div className="p-6 bg-white shadow-md rounded-lg mt-6">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <>
                   <ul>
                    {cartItems.map((book) => (
                        <li key={book._id} className="flex items-start border-b py-4">
                            <img src={book.imageUrl} alt={book.title} className="w-24 h-36 object-cover rounded-md mr-4" />
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold">{book.title}</h3>
                                <p className="text-gray-700">Author: {book.author}</p>
                                <p className="text-gray-600">Description: {book.description}</p>
                                <p className="text-lg font-bold">Price: ₹{book.price}</p>
                                <button
                                    className="mt-2 text-red-500 hover:text-red-700"
                                    onClick={() => handleRemove(cartItems.indexOf(book))}
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold">Total Amount: ₹{totalPrice}</h3>
                    </div>

                    <button
                        className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                        onClick={handleOrder}
                    >
                        Order Now
                    </button>
                </>
            )}
            {isPopupOpen && <OrderPopup cartItems={cartItems} totalPrice={totalPrice} onClose={handleClosePopup} onSubmit={handleSubmitOrder} />}
            {isSuccessPopupOpen && <SuccessPopup orderDetails={orderDetails} onClose={handleCloseSuccessPopup} />}
        </div>
        </>
    );
};

export default Cart;
