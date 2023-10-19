import {useNavigate} from "react-router-dom";

const HomePage=()=>{
    const navigate = useNavigate()

    const redRaise = ()=>{
        navigate('/raiseAQuery')
    }
    const redFetAll = ()=>{
        navigate('/fetAll')
    }
    const redFetMine = ()=>{
        navigate('/fetMine')
    }

    return(
        <div className= {"flex justify-center items-center h-screen "}>
            <button className="rounded-full left-4 border-3 top-2 -m-1 bg-amber-500 border-amber-950 text-white px-4 py-2 mr-4" onClick={redRaise}>
                Raise a query
            </button>
            <button className="rounded-full left-4 border-3 top-2 -m-1 bg-amber-500 border-amber-950 text-white px-4 py-2 mr-4" onClick={redFetAll}>
                Fetch All
            </button>
            <button className="rounded-full left-4 border-3 top-2 -m-1 bg-amber-500 border-amber-950 text-white px-4 py-2 mr-4" onClick={redFetMine}>
                Fetch Mine
            </button>
        </div>
    )
}

export default HomePage
