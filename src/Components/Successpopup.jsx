import React from 'react';

const SuccessPopup = ({ orderDetails, onClose }) => {
    const { userDetails, cartItems, totalPrice } = orderDetails;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Order Placed Successfully!</h2>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold">User Details</h3>
                    <p><strong>Name:</strong> {userDetails.name}</p>
                    <p><strong>Address:</strong> {userDetails.address}</p>
                    <p><strong>Phone:</strong> {userDetails.phone}</p>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Order Summary</h3>
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

                <button onClick={onClose} className="bg-green-500 text-white py-2 px-4 rounded">Close</button>
            </div>
        </div>
    );
};

export default SuccessPopup;
