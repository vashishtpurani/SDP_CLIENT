import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const UserSignUp =()=>{
    const baseURL="http://localhost:5000/"
    const navigate = useNavigate()
    let res
    const [data,setData] = useState({
        firstName:'',
        lastName:'',
        phoneNumber:'',
        password:''
    })
    const authAxios = axios.create({
        baseURL:baseURL,
        headers:{
            Authorization:`Bearer ${sessionStorage.getItem('token')}`
        }
    })
    const handleSubmit = async(event)=>{
        event.preventDefault()
        try{
            res = await authAxios.post("user/signUp", data)
            console.log(res)
        }catch (e) {
            console.log(e)
        }
        if(res.status===200){
            navigate("/login")
        }
    }
    return(
        <>
            <form>
                <label>firstName : </label>
                <input className={"border-2"} type="text" value={data.firstName} onChange={(event)=>{
                    setData({...data,firstName:event.target.value})}}></input><br/>
                <label>lastName : </label>
                <input className={"border-2"} type="text" value={data.lastName} onChange={(event)=>{
                    setData({...data,lastName:event.target.value})}}></input><br/>
                <label>phoneNumber : </label>
                <input className={"border-2"} type="text" value={data.phoneNumber} defaultValue={sessionStorage.getItem("num")} onChange={(event)=>{
                    setData({...data,phoneNumber:event.target.value})}}></input><br/>
                <label>password : </label>
                <input className={"border-2"} type="text" value={data.password} onChange={(event)=>{
                    setData({...data,password:event.target.value})}}></input><br/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </>
    )
}
export default UserSignUp
