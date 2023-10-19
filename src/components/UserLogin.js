import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const UserLogin =()=>{
    const baseURL="http://localhost:5000/"
    const navigate = useNavigate()
    let res
    const [data,setData] = useState({
        number:'',
        password:''
    })
    const handleSubmit = async(event)=>{
        event.preventDefault()
        try{
            res = await axios.post(baseURL+"user/signIn",data)
            console.log(res.cookies)
            if(res.status===200){
                sessionStorage.setItem('token',res.data.token)
                navigate("/home");
            }
        }catch (e) {
            console.log(e)
        }
    }
    return(
        <>
            <form>
                <label>Number : </label>
                <input className={"border-2"} type="text" value={data.number} onChange={(event)=>{
                    setData({...data,number:event.target.value})}}></input><br/>
                <label>Password : </label>
                <input className={"border-2"} type="text" value={data.password} onChange={(event)=>{
                    setData({...data,password:event.target.value})}}></input><br/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </>
    )
}
export default UserLogin
