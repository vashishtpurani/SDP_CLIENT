import React, { useState } from "react";
import axios from "axios";

const FeedbackModal = ({ onClose, onSubmit, advId, qId }) => {
    const baseURL = "http://localhost:5000/";
    const token = sessionStorage.getItem("token");
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const [feedbackText, setFeedbackText] = useState("");
    const [rating, setRating] = useState(0);
    const [data,setData] = useState({
        advId: sessionStorage.getItem("advId"),
        uId: sessionStorage.getItem("uId"),
        qId: sessionStorage.getItem("qId"),
        feedbackText: "",
        ratings: "",
    })
    const handleTextChange = (event) => {
        setFeedbackText(event.target.value);
    }

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        setData((prevData) => ({
            ...prevData,
            ratings: newRating,
        }));
    };

    const handleSubmit = async() => {
        // You can perform any necessary validation here before submitting
        // const feedbackData = {
        //     advId: advId,
        //     qId: qId,
        //     feedbackText: feedbackText,
        //     rating: rating,
        // };
        //
        // // Send the feedbackData object to the API
        // onSubmit(feedbackData);
        // console.log(data)
        // Close the modal after submitting
        const res = await authAxios.post(`/user/crtFeedback`,data)
        console.log(res)
        onClose();
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`cursor-pointer text-2xl ${
                        i <= rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => handleRatingChange(i)}
                >
                &#9733;
            </span>
            );
        }
        return stars;
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75 blur"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        {/* Close Button */}
                        <div className="absolute top-0 right-0 pt-2 pr-2">
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500"
                                onClick={onClose}
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="sm:flex sm:items-start">
                            <div className="w-full">
                                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
                                    Text Feedback
                                </label>
                                <div className="mt-1">
                  <textarea
                      id="feedback"
                      name="feedback"
                      rows="3"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter your feedback here..."
                      value={data.feedbackText} onChange={(event)=>{setData({...data,feedbackText:event.target.value})}}
                  ></textarea>
                                </div>
                            </div>

                            <div className="w-full mt-4 sm:mt-0 sm:ml-4">
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                                    Rating
                                </label>
                                <div className="mt-1 flex space-x-2">
                                    {renderStars()}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={handleSubmit}
                            >
                                Submit Feedback
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;
