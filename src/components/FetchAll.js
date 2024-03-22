import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchAll = () => {
    const baseURL = "http://localhost:5000/";
    const token = sessionStorage.getItem("token");
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const [data, setData] = useState([]);
    let res;

    const getAll = async () => {
        try {
            res = await authAxios.get("user/getAll");
            setData(res.data);
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getAll();
    }, []);

    const formatTime = (time) => {
        const currentDate = new Date();
        const responseDate = new Date(time);

        // Calculate the time difference
        const timeDifference = currentDate.getTime() - responseDate.getTime();
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));

        if (minutesDifference < 60) {
            return `${minutesDifference}m ago`;
        } else {
            const hoursDifference = Math.floor(minutesDifference / 60);
            if (hoursDifference < 24) {
                return `${hoursDifference}h ago`;
            } else {
                const daysDifference = Math.floor(hoursDifference / 24);
                return `${daysDifference}d ago`;
            }
        }
    }

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-3xl font-bold mb-4">All Data</h1>
            {data.map((item) => (
                <div key={item._id} className="bg-white p-4 mb-4 shadow">
                    <p className="text-gray-600 mb-2">
                        Query: {item.query}
                    </p>
                    <p className="text-gray-600 mb-2">
                        Classification: {item.Classified}
                    </p>
                    <p className="text-gray-600 mb-2">
                        Status: {item.Status ? "Answered" : "Unanswered"}
                    </p>
                    <p className="text-gray-600 mb-4">
                        Created At: {formatTime(item.createdAt)}
                    </p>

                    <h3 className="text-lg font-semibold mb-2">Answers:</h3>
                    <ul>
                        {item.Ans.map((answerObject, index) => (
                            <li key={index} className="mb-2">
                                <div className="border p-4 rounded-md shadow flex flex-col">
                                    <p className="text-gray-800">
                                        Lawyer Name: {answerObject.lawyerName}
                                    </p>
                                    <ul>
                                        {answerObject.ANS.map((ans, ansIndex) => (
                                            <li key={ansIndex} className="text-gray-800 flex justify-between">
                                                <div>
                                                    <p>Answer: {ans.ans}</p>
                                                </div>
                                                <div className="text-gray-600">
                                                    {formatTime(ans.time)}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default FetchAll;
