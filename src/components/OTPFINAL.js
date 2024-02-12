import gavelBg from "../assets/images/user/gavelBg.png"
import {useNavigate} from "react-router-dom"
import React, {useEffect, useState} from "react"
import axios from "axios"
import OtpInput from "react-otp-input"
import {NotificationContainer, NotificationManager} from 'react-notifications'
import 'react-notifications/lib/notifications.css'


const OTPFINAL = () => {
    const navigate = useNavigate()
    const baseUrl = "http://localhost:5000/"

    const [otp, setOtp] = useState()
    const [data, setData] = useState({ number: '' })
    const [verify, setVerify] = useState({ number: "", otp: "" })
    const [click, setClick] = useState(true)
    const [timer, setTimer] = useState(60)
    const [error, setError] = useState(false)


    let res
    const reqOtp = async (event) => {
        try{
            event.preventDefault()

            res = await axios.post(baseUrl + "user/sendOtp", data)

            sessionStorage.setItem("num", data.number);
            setVerify({ ...verify, number: data.number });
            // console.log(res);

            if(res.status===200) {
                setClick(false)
                setTimer(60)
            }
            else if(res.status===400) alert("user already exists")
            else alert("Something went wrong please try again later")
        }catch (e) {
            setError(true)
            if(e.response.status===400) NotificationManager.error("User already exists")
            console.log(e)
            setTimeout(() => {
                setError(false)
            }, 1000)
        }

    }

    const ver = async () => {
        // event.preventDefault();
        console.log(verify);

        try {
            res = await axios.post(baseUrl + "user/verify", verify);

            if (res.status === 200) {
                console.log();
                sessionStorage.setItem("token", res.data.token);
                navigate("/signup");
            }
        } catch (e) {
            setError(true);
            console.log(e)
        }
    }

    const blurMiddleDigits = (phoneNumber) => {
        const prefix = phoneNumber.slice(0, 3);
        const suffix = phoneNumber.slice(-3);
        const blurredMiddle = "*".repeat(phoneNumber.length - 6);
        return `${prefix}${blurredMiddle}${suffix}`;
    };

    useEffect(() => {
        let interval;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timer]);
    useEffect(()=>{
        if(verify.otp.length===4) {
            console.log("yes")
            ver()
        }
    },[verify.otp])


    return (
        <div className={`h-screen w-screen flex items-center justify-center bg-bgDarkBlue `}>
            <img src={gavelBg} className="absolute inset-0 object-cover w-full h-full z-0 select-none" alt="Background" />
            <div className="p-4 mx-auto my-auto h-1/2 w-1/3 bg-offwhite z-10 opacity-80 rounded-2xl flex flex-col shadow-md shadow-amber-50">
                <div className="w-full h-1/6 mt-3 text-mdGold text-5xl flex items-center justify-center relative">
                    <div className="font-mono">
                        Sign Up
                        {/*<div className="bg-mdGold w-1/4 mt-2 h-1" />*/}
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                    </div>
                </div>
                {/*SEND OTP DIV*/}
                <div className={`h-5/6 w-full flex flex-col ${error ? 'transition ease-out duration-1000 animate-shake' : ''}`}>
                    {click?(
                        <div className="mx-auto my-auto w-[70%] h-[70%] space-y-6">
                            <div className="text-mdGold mt-6 font-mono text-2xl">
                                Enter your phone number
                            </div>
                            <input
                                type="text"
                                id="phoneNumber"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={sessionStorage.getItem("num")}
                                value={data.number}
                                onChange={(event) => setData({ ...data,number: event.target.value })}
                                required
                            />
                            <div>
                                Already a user? <a href={"/login"} className={"font-semibold text-mdGold"}>Login</a>
                            </div>
                        </div>
                    ):(
                        <div className="mx-auto my-auto w-[70%] h-[70%] space-y-2 justify-center items-center text-center">
                            <div className="text-mdGold -mt-1 font-mono text-center">
                                OTP has been sent to your number {"+91 " + blurMiddleDigits(data.number)}
                            </div>
                            <div className="text-mdGold mt-3 font-mono text-3xl text-center">
                                Please enter your otp
                            </div>
                            <div className="text-mdGold -mt-1 font-mono text-center">
                                otp expires in {timer}s
                            </div>
                            <div className="flex items-center justify-center">
                                <OtpInput
                                    className="border-2 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                                    value={verify.otp}
                                    onChange={(val) => setVerify({ ...verify, otp: val })}
                                    numInputs={4}
                                    isInputNum={true}
                                    shouldAutoFocus={true}
                                    inputStyle={{
                                        border: "1px solid transparent",
                                        borderRadius: "8px",
                                        width: "54px",
                                        height: "54px",
                                        fontSize: "12px",
                                        color: "#ffff",
                                        fontWeight: "400",
                                        caretColor: "blue",
                                        background: "#0E2229",
                                    }}
                                    focusStyle={{
                                        border: "1px solid #CFD3DB",
                                        outline: "none",
                                    }}
                                    renderSeparator={<span className="w-0.5"></span>}
                                    renderInput={(props) => <input {...props} />}
                                />
                            </div>
                        </div>
                    )}
                    {click?(
                        <button className="text-mdGold w-fit mx-auto bg-gray-800 p-3 rounded-2xl hover:scale-105 transition-transform duration-300" onClick={reqOtp}>
                            Send OTP
                        </button>
                    ):null}
                </div>
            </div>
            <NotificationContainer/>
        </div>
    )
}

export default OTPFINAL;
