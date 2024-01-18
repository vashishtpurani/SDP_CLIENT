import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
    const baseURL = 'http://localhost:5000/';
    const token = sessionStorage.getItem('lawToken');
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const res = await authAxios.get(`law/getFeedback`);
            console.log(res.data.data);

            // Sort the data based on ratings in descending order
            const sortedData = res.data.data.sort((a, b) => b.ratings - a.ratings);
            setData(sortedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">User Feedback</h1>
            {data.map((feedback) => (
                <div key={feedback._id} className="bg-white p-6 mb-8 rounded-lg shadow-md">
                    <p className="text-lg font-semibold mb-2">Feedback: {feedback.feedback}</p>
                    <p className="text-lg font-semibold mb-2">Name: Bhavya</p>
                    <div className="flex items-center mb-2">
                        <p className="text-gray-600 mr-4">Rating: {feedback.ratings}</p>
                        <p className="text-gray-600">Classified: {feedback.classified}</p>
                    </div>
                    <p className="text-gray-600">Created At: {new Date(feedback.createdAt).toLocaleString()}</p>
                    {/* Add more details as needed */}
                </div>
            ))}
        </div>
    );
};

export default Feedback;
