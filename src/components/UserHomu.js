import React, { useEffect, useState } from 'react';
import Sidu from './Sidu';
import Nabu from './Nabu';
import { AiFillCaretUp, AiOutlineCaretDown, AiFillMessage } from 'react-icons/ai';
import axios from 'axios';
import { MdModeComment } from "react-icons/md";
import { IoMdAdd, IoMdShare } from "react-icons/io";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { NotificationContainer, NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';

export const UserHomu = () => {
    const baseURL = 'http://localhost:5000/';
    const token = sessionStorage.getItem('token');
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [upVote, setUpVote] = useState(false)
    const [downVote, setDownVote] = useState(false)
    let statuss
    const getAll = async () => {
        try {
            const response = await authAxios.get('user/getAll');
            setData(response.data)
            setFilteredData(response.data)
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
    const Vote = async (path, id) => {
        try {
            if (path === "upVote") {
                statuss = "text-green-400"
            }
            if (path === "downVote") {
                statuss = "text-red-400"
            }

            const res = await authAxios.put(`/user/${path}/${id}`)
            console.log(res)
        } catch (e) {
            console.log(e)
        }

    }
    const notif = () => {
        const status = sessionStorage.getItem("status")
        if (status === "success") {
            NotificationManager.success("Query Posted Successfully!!!")
            sessionStorage.removeItem("status")
        }
    }
    useEffect(() => {
        notif()
        getAll();
    }, []);

    const countAllAnswers = (ansArray) => {
        let count = 0;

        const countAnswers = (array) => {
            array.forEach((item) => {
                if (item.ANS) {
                    count += item.ANS.length;
                    countAnswers(item.ANS); // Recursively count nested answers
                }
            });
        };

        if (ansArray) {
            countAnswers(ansArray);
        }

        return count;
    };

    const handleFilter = (category) => {
        const filteredData = data.filter(item => item.Classified === category);
        setFilteredData(filteredData);
    };

    const formatTime = (time) => {
        const currentDate = new Date();
        const responseDate = new Date(time);

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
    //Dynamic Css change
    const fontSize = (i) => {
        if (i.length < 15) {
            return "text-8xl"
        } else if (i.length > 15 && i.length < 30) {
            return "text-7xl"
        } else if (i.length > 30 && i.length < 50) {
            return "text-5xl"
        } else if (i.length > 50 && i.length < 100) {
            return "text-2xl"
        }
    }
    const voteCount = (item) => {
        const len = item.upVote.length - item.downVote.length
        return len
    }
    const checkUpVote = (item) => {
        const userId = token ? JSON.parse(atob(token.split('.')[1])).id : null;
        console.log(item)
        if (item.upVote.includes(userId)) {
            console.log("Upvote")
            return "text-green-400"
        }
    }
    const checkDownVote = (item) => {
        const userId = token ? JSON.parse(atob(token.split('.')[1])).id : null;
        console.log(item)
        if (item.downVote.includes(userId)) {
            console.log("Upvote")
            return "text-red-400"
        }
    }

    return (
        <div className="min-h-screen bg-searchbarup flex ml-64">
            <Sidu />
            <div className="flex-col w-screen">
                <Nabu onFilter={handleFilter} />
                <div className="flex flex-wrap">
                    {filteredData ? (
                        filteredData.map((item, index) => (
                            <div key={item._id} className={`w-fit h-fit mx-auto my-auto  sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 flex`}>
                                <div className={` mx-auto my-auto rounded-md overflow-hidden mb-4 p-4 ${index % 2 === 0 ? 'bg-mdGold' : 'bg-gray-700'}`}>
                                    <h1 className={`${fontSize(item.query)} font-bold mb-2`}>{item.query}</h1>
                                    <div className="flex mb-2 items-start mt-4">
                                        <label className="text-sm text-offwhite">{item.Classified} | {formatTime(item.createdAt)}</label>
                                    </div>
                                    <br /><br />
                                    <div className="flex flex-row justify-start items-center text-center space-x-6">
                                        <div className="flex flex-col justify-center items-center text-center">
                                            <button className={`${checkUpVote(item)} ${statuss}`} onClick={() => Vote("upVote", item.id)}> <RxCaretUp size="28" /></button>
                                            <div className={`w-7 items-center ${checkUpVote(item)} ${checkDownVote(item)}`}>
                                                <label>{voteCount(item)}</label>
                                            </div>
                                            <button className={`${checkDownVote(item)}`} onClick={() => Vote("downVote", item.id)}> <RxCaretDown size="28" /></button>
                                        </div>
                                        <div className="flex">
                                            <button className="text-gray-500">
                                                <MdModeComment size="28" />
                                            </button>
                                            <div className='w-7 items-center'>
                                                <label>{countAllAnswers(item.Ans)}</label>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <button className="rounded-full p-0.5 w-fit h-fit text-gray-500">
                                                <IoMdShare size="28" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : null}
                    <div
                        className="fixed bottom-10 right-10 bg-gray-500 text-white p-4 rounded-full cursor-pointer shadow-gray-500 shadow-md mix-blend-luminosity"
                        onClick={() => {
                            navigate("/raiseAQuery");
                        }}
                    >
                        <IoMdAdd size={32} />
                    </div>
                </div>
            </div>
            <NotificationContainer />
        </div>
    )
}

export default UserHomu;
