import React, {useState} from "react";
import signin from "../logsign.jpg"
// import log from "./logsign.jpg"
import {useNavigate} from "react-router-dom";
import axios from "axios";

const LawyerLogin=()=>{
    const baseURL="http://localhost:5000/"
    const navigate = useNavigate()
    let res
    const [data,setData] = useState({
        advNum:'',
        advPass:''
    })
    const handleSubmit = async(event)=>{
        event.preventDefault()
        try{
            res = await axios.post(baseURL+"law/signIn",data)
            console.log(res)
            if(res.status===200){
                sessionStorage.setItem('lawToken',res.data.token)
                navigate("/law/home");
            }
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="w-full h-screen items-start">
            <div className=' absolute top-[12%] rounded-3xl p-8 left-[4%] bg-dcream transition-transform duration-500 h-[55%] w-[50%]'>
                <div className="bg-lcream rounded-3xl p-8">
                    <p className="text-5xl text-center mb-8">Login</p>
                    <div className="text-center">
                        <form>
                            <div className="mb-4">
                                <input type="text"
                                       className="bg-lcream1 rounded-md p-2 w-full"
                                       placeholder="Phone number"
                                       value={data.advNum} onChange={(event)=>{setData({...data,advNum:event.target.value})}}
                                />
                            </div>
                            <div className="mb-4">
                                <input type="text"
                                       className="bg-lcream1 rounded-md p-2 w-full"
                                       placeholder="Password"
                                       value={data.advPass} onChange={(event)=>{setData({...data,advPass:event.target.value})}}
                                />
                            </div>

                            <button type="submit" className="bg-lcream1 text-black-50 py-2 rounded-md w-1/4 px-4" onClick={handleSubmit}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
            <img src={signin} className='w-full h-full'/>
        </div>
    );
}

export default LawyerLogin
