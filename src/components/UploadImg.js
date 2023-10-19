import {useState} from "react";

const UploadImg =()=>{
    const [file,setFile]= useState()
    const HandleSubmit =(e)=>{
        console.log(file)
    }
    return(
        <div>
            <input type={"file"} onChange={e=>setFile(e.target.files[0])}/>
            <button onClick={HandleSubmit}>Upload</button>
        </div>
    )
}
export default UploadImg
