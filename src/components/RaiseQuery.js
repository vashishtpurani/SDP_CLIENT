import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Sidu from "./Sidu"
import {NotificationContainer, NotificationManager} from 'react-notifications'
import 'react-notifications/lib/notifications.css'


const RaiseQuery = () => {
    const navigate = useNavigate()
    const baseURL = "http://localhost:5000/"
    const token = sessionStorage.getItem("token")
    const [set,isSet] = useState(true)
    useEffect(() => {
        if (!token) navigate("/login")
    }, [])

    const [data, setData] = useState({
        query: "",
        Classs:""
    });

    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const [query,setQuery]=useState({})
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
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await authAxios.post("user/senSim", data);
            console.log(res.data)
            if (res.status === 200) {
                setData({ ...data, Classs: res.data.classs })
                if(res.data.data.length===0){
                    let res = await authAxios.post("user/raiseQuery",data)
                    console.log(res)
                    navigate("/homu")
                }else{
                    setQuery(res.data.data)
                    isSet(false)
                }
            }
            sessionStorage.setItem("classs", res.data.classs);
        } catch (e) {
            NotificationManager.error("There was a problem with the server please try again later")
            console.log(e);
        }
    };
    const raiseAnyways = async()=>{
        try {
            let res = await authAxios.post("user/raiseQuery",data)
            if(res.status===200){
                sessionStorage.setItem("status","success")
                console.log(res,"Query Raised Successfully!!!!")
                navigate("/homu")
            }
        }catch (e){
            console.log(e,"ERROR SADGHE")
            NotificationManager.error("There was a problem with the")
        }
    }

    return (
        <div>
                <Sidu />
                    {set ? (
                        <div className="flex justify-center items-center h-screen bg-searchbarup">
                            <div className="bg-gray-100 p-8 rounded-lg shadow-md w-96">
                                <h1 className="text-2xl font-bold mb-4">Enter your query :</h1>
                                <input
                                    className="w-full border-2 p-2 mb-4"
                                    type="text"
                                    value={data.query}
                                    onChange={(event) => setData({ ...data, query: event.target.value })}
                                    placeholder="Enter your query"
                                />
                                <button
                                    className="bg-searchbardown text-white px-4 py-2 rounded-md hover:bg-searchbarup transition-all duration-300 ease-linear"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={"min-h-screen bg-searchbarup flex ml-64"}>
                            <div className={"fixed w-screen bg-searchbardown font-bold p-4 flex flex-row space-x-3"}>
                                <div className={"text-start flex text-white"}>
                                    Not Satisfied with these?
                                </div>
                                <div className={"flex"}>
                                    <button className={"hover:text-gray-400 transition-all duration-300 ease-linear "} onClick= {raiseAnyways}>
                                        Post Query.
                                    </button>
                                </div>
                            </div>
                            <div className="container mx-auto my-8 mt-20">
                                {query.map((item) => (
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
                        </div>
                    )}
            <NotificationContainer/>
        </div>
    )
}

export default RaiseQuery
