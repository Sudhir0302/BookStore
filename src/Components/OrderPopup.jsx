import React, { useState } from 'react';

const OrderPopup = ({ cartItems, totalPrice, onClose, onSubmit }) => {
    const [userDetails, setUserDetails] = useState({
        name: '',
        address: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        });
    };

    const handleSubmit = () => {
        onSubmit(userDetails); 
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Order Details</h2>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={userDetails.address}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Cart Summary</h3>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item._id} className="flex justify-between">
                                <span>{item.title}</span>
                                <span>₹{item.price}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 font-bold text-lg">
                        Total Amount: ₹{totalPrice}
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <button onClick={onClose} className="bg-red-500 text-white py-2 px-4 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default OrderPopup;
