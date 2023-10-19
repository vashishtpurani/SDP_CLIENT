import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const RaiseQuery = ()=>{
    let res
    const navigate = useNavigate()
    const baseURL="http://localhost:5000/"
    const token = sessionStorage.getItem("token")
    useEffect(()=>{
        if(!token) navigate('/login')
    },[])
    const [data,setData] = useState({
        query:'',
        token:token
    })
    const authAxios = axios.create({
        baseURL:baseURL,
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    const handleSubmit = async(event)=>{
        event.preventDefault()
        try{
            res = await authAxios.post("user/raiseQuery", data)
            console.log(res)
        }catch (e) {
            console.log(e)
        }
        // if(res.status===200){
        //     navigate("/login")
        // }
    }
    return(
        <div className= {"flex justify-center items-center h-52"}>
            This is raise query
            <input className={"border-2"} type="text" value={data.query} onChange={(event)=>{
                setData({...data,query:event.target.value})}}></input><br/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default RaiseQuery
