import React, { useEffect, useState } from "react";
import axios from "axios";
import LawSidebar from "./LawSidebar";

const LawReq = () => {
    const [friendRequests, setFriendRequests] = useState([]);
    const baseURL = "http://localhost:5000/";
    const token = sessionStorage.getItem("lawToken");
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const fetchFriendRequests = async () => {
        try {
            const response = await authAxios.get('/chat/getCom');
            setFriendRequests(response.data.data[0]);
            console.log(response.data.data[0]);
        } catch (error) {
            console.error("Error fetching friend requests:", error);
        }
    };

    useEffect(() => {
        fetchFriendRequests();
        console.log(friendRequests)
    }, []);
    const accept = async(id)=>{
        const res = await authAxios.post(`/chat/acceptCom/${id}`)
        console.log(res)
    }
    return (
        <div>
            {/*<LawSidebar />*/}
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Friend Requests:</h1>
                {friendRequests.users}     <button onClick={()=>accept(friendRequests.users)}>accept</button>      <button>decline</button>
                {/*{friendRequests.map((friendRequestData) => (*/}
                {/*    <div >*/}
                {/*        <p>{friendRequestData}     <button onClick={()=>accept()}>accept</button>      <button>decline</button></p>*/}
                {/*    </div>*/}
                {/*))}*/}
            </div>
        </div>
    );
};

export default LawReq;
