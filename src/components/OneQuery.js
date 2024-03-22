import axios from "axios"
import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidu from "./Sidu";
import Nabu from "./Nabu";

const OneQuery = ()=>{

    const baseURL = "http://localhost:5000/"
    const token = sessionStorage.getItem("token")
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    const [data, setData] = useState([])
    let res

    const getOne = async () => {
        try {
            console.log(`/getOne/${id}`)
            res = await authAxios.get(`/user/getOne/${id}`)
            setData(res.data.data)
            console.log(res.data.data)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    useEffect(() => {
        getOne()
    }, [])

    const formatTime = (time) => {
        const currentDate = new Date()
        const responseDate = new Date(time)

        const timeDifference = currentDate.getTime() - responseDate.getTime()
        const minutesDifference = Math.floor(timeDifference / (1000 * 60))

        if (minutesDifference < 60) {
            return `${minutesDifference}m ago`
        } else {
            const hoursDifference = Math.floor(minutesDifference / 60)
            if (hoursDifference < 24) {
                return `${hoursDifference}h ago`
            } else {
                const daysDifference = Math.floor(hoursDifference / 24)
                return `${daysDifference}d ago`
            }
        }
    }

    return(
        <div className="min-h-screen bg-searchbarup flex ml-64">
            <Sidu />
            <div className="flex-col w-screen">
                <div className="flex flex-wrap">
                    <div className="container mx-auto my-8 mt-20">
                        {data.map((item) => (
                            <div key={item._id} className="bg-white rounded-md mx-auto my-auto p-4 mb-4 shadow">
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
                                {item.Ans.length!==0?
                                    <ul>
                                        {item.Ans.map((answerObject, index) => (
                                            <li key={index} className="mb-2">
                                                <div className="border p-4 rounded-md shadow flex flex-col">
                                                    <p className="text-gray-800">
                                                        Lawyer Name: {index===0?("Bhavya"):("Gandhi")}
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
                                    :(
                                        <div>
                                            Query not Answered yet!!
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}
export default OneQuery
