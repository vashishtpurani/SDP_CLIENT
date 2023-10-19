import { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom";

const OtpVerify =()=>{
    const navigate = useNavigate()
    const baseUrl="http://localhost:5000/"
    const [data,setData] = useState({
        number:''
    })
    const [verify,setVerify] = useState({
        number:"",
        otp:""
    })
    const [click,setClick] = useState(true)
    let res

    const OTPP = async(event)=>{
        event.preventDefault()
        await axios.post(baseUrl+"user/sendOtp",data).then(()=>{
            console.log(data)
        })
        sessionStorage.setItem("num",data.number)
        setVerify({...verify, number: data.number})
        console.log(data)
        setClick(false)
    }

    const ver = async(event)=>{
        event.preventDefault()
        console.log(verify)
        try{
            res = await axios.post(baseUrl + "user/verify", verify)
            if (res.status === 200) {
                console.log()
                sessionStorage.setItem("token",res.data.token)
                navigate("/signup")
            }
        }catch (e) {

        }
    }

    return(
        <>
            <form>
                <label>Number : </label>
                <input className={"border-2"} type="text" value={data.number} defaultValue={sessionStorage.getItem("num")} onChange={(event)=>{
                    setData({...data,number:event.target.value})}}></input>
                {click?(<div></div>):(<div>
                    <label>Otp : </label>
                    <input className={"border-2"} type="text" value={verify.otp} onChange={(event)=>{
                        setVerify({...verify,otp:event.target.value})
                    }} ></input>
                    <button onClick={ver}>verify otp</button>
                </div>)}
                {click?(<div><button onClick={OTPP}>Send OTP</button></div>):(<div></div>)}
            </form>
        </>
    )
}
export default OtpVerify
