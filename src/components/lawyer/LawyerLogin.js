import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const LawyerLogin =()=>{
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
    return(
        <div>
            <form>
                <label>Number : </label>
                <input className={"border-2"} type="text" value={data.advNum} onChange={(event)=>{
                    setData({...data,advNum:event.target.value})}}></input><br/>
                <label>Password : </label>
                <input className={"border-2"} type="text" value={data.advPass} onChange={(event)=>{
                    setData({...data,advPass:event.target.value})}}></input><br/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}
export default LawyerLogin
