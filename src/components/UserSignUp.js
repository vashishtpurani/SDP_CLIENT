import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import background from "../assets/images/user/gavelBg.png";
import lawlady from "../assets/images/user/lawlady.jpg";

const UserSignUp =()=>{
    const [selected, setSelected] = useState(false);

    const changeSelected = () => {
        setSelected((prevSelected) => !prevSelected);
    };

    const baseURL = "http://localhost:5000/";
    const navigate = useNavigate();
    let res;
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        // Define your slides here
        <div className="flex flex-col justify-between h-full">
            <div>
                {/* TEXT REVIEW COMES HERE */}
                <p className="text-xl text-white my-4 mx-3 text-left">
                    Best website ever made. Gotta be one of the best websites for legal
                    advice!
                </p>
            </div>
            <div className="flex items-center px-4 py-2">
                {/* REVIEWER PROFILE PICTURE AND NAME COMES HERE */}
                <div className="rounded-full bg-cyan-700 h-12 w-12">
                    {/* REVIEWER'S PROFILE PICTURE COMES HERE */}
                </div>
                <p className="text-xl text-bold text-white font-garamond ml-3">
                    Christopher Larkin
                </p>
            </div>
        </div>,
        <div className="flex flex-col justify-between h-full">
            <div>
                {/* TEXT REVIEW COMES HERE */}
                <p className="text-xl text-white my-4 mx-3 text-left">
                    Best website ever made. Gotta be one of the best websites for legal
                    advice!
                </p>
            </div>
            <div className="flex items-center px-4 py-2">
                {/* REVIEWER PROFILE PICTURE AND NAME COMES HERE */}
                <div className="rounded-full bg-cyan-700 h-12 w-12">
                    {/* REVIEWER'S PROFILE PICTURE COMES HERE */}
                </div>
                <p className="text-xl text-bold text-white font-garamond ml-3">
                    Steafen Hawkings
                </p>
            </div>
        </div>,
        <div className="flex flex-col justify-between h-full">
            <div>
                {/* TEXT REVIEW COMES HERE */}
                <p className="text-xl text-white my-4 mx-3 text-left">
                    Best website ever made. Gotta be one of the best websites for legal
                    advice!
                </p>
            </div>
            <div className="flex items-center px-4 py-2">
                {/* REVIEWER PROFILE PICTURE AND NAME COMES HERE */}
                <div className="rounded-full bg-cyan-700 h-12 w-12">
                    {/* REVIEWER'S PROFILE PICTURE COMES HERE */}
                </div>
                <p className="text-xl text-bold text-white font-garamond ml-3">
                    Chris Pat
                </p>
            </div>
        </div>,
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

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
        <div className="bg-bgblackblue flex content-center text-center items-center h-screen w-screen">
            <img
                src={background}
                className="absolute object-cover w-full h-full inset-0 z-0"
                alt=""
            />
            <div className="relative rounded-bigf p-10 mx-auto my-auto w-[50%] h-[80%] flex flex-cols">
                <img
                    src={lawlady}
                    className="absolute blur-sm object-cover rounded-bigf w-full h-full inset-0 z-0"
                    alt=""
                />
                <div className="w-full h-full z-10">
                    <div className="w-14 h-14 rounded-full bg-cyan-700">
                        {/* LOGO COMES HERE */}
                    </div>
                    <div className="w-1/2 h-1/3 my-4 flex content-center items-center">
                        {/* THIS IS TEXT, REMOVE BG ORANGE AFTER ADDING INFORMATION IN THE DIV TAG UNDER THIS */}
                        <div className="h-[85%] w-[90%] mx-auto my-auto">
                            <p className="text-4xl text-white font-garamond">Nyay Saarthi.</p>
                            <p className="text-l text-white mx-2 my-2">
                                Nyay Saarthi is an NLP based portal created to act as an
                                interface betwen citizens and people with knowledge of law.
                                Citizens can ask their law related or legal queries to verified
                                professionals and lawyers without any hesitation and without
                                the worry of nature of their question.
                            </p>
                        </div>
                    </div>
                    <div className="relative w-full h-1/3 mx-auto my-auto flex flex-row justify-start overflow-hidden">
                        {/* REVIEWS COME HERE */}
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`bg-reviewbrown bg-opacity-80 rounded-2xl h-[80%] w-full md:w-[30%] my-auto md:mx-auto md:ml-0 md:mr-auto absolute transition-transform duration-1000 ease-in-out`}
                                style={{
                                    transform: `translateX(${(index - currentSlide + slides.length) % slides.length * 100}%)`,
                                    marginLeft: index !== 0 ? `${index * 20}px` : "0",
                                    opacity:
                                        index === currentSlide ||
                                        (index === (currentSlide + 1) % slides.length && currentSlide !== slides.length - 1) ? 1 : 0, // Only show current slide and next slide, except when on the last slide
                                    pointerEvents:
                                        index === currentSlide ||
                                        (index === (currentSlide + 1) % slides.length && currentSlide !== slides.length - 1) ? 'auto' : 'none', // Ensure only visible slides can receive events
                                    zIndex:
                                        index === currentSlide ||
                                        (index === (currentSlide + 1) % slides.length && currentSlide !== slides.length - 1) ? 1 : 0, // Ensure the current slide and next slide are on top of the stack, except when on the last slide
                                }}
                            >
                                {slide}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute z-10 flex flex-col w-1/2 h-full rounded-bigf bg-[#b3b3b3] right-0 top-0">
                    <div className="text-center w-full h-1/4">
                        {/* TEXT BEFORE FORM */}
                        <div className="flex justify-center items-center mt-[25%]">
                            <p className="text-6xl font-garamond">Sign-up</p>
                        </div>
                    </div>
                    <div className="p-5 h-3/4 w-full">
                        <div>
                            <div>
                                <form className="flex flex-col justify-center items-center">
                                    <input
                                        type="text"
                                        name="text"
                                        placeholder="FirstName"
                                        className="bg-blackblue text-white p-3 w-[50%] rounded-lg my-2 mx-3"
                                        type="text" value={data.firstName}
                                        onChange={(event)=>{
                                        setData({...data,firstName:event.target.value})}}
                                    ></input>
                                    <input
                                        type="text"
                                        placeholder="lastName"
                                        className="bg-blackblue text-white w-[50%] p-3 rounded-lg my-2 mx-3"
                                        value={data.lastName}
                                        onChange={(event)=>{
                                        setData({...data,lastName:event.target.value})}}
                                    />
                                    <input
                                        type="text"
                                        placeholder="phoneNumber"
                                        className="bg-blackblue text-white w-[50%] p-3 rounded-lg my-2 mx-3"
                                        value={data.phoneNumber}
                                        defaultValue={sessionStorage.getItem("num")}
                                        onChange={(event)=>{
                                        setData({...data,phoneNumber:event.target.value})}}
                                    />
                                    <input
                                        type="password"
                                        placeholder="password"
                                        className="bg-blackblue text-white w-[50%] p-3 rounded-lg my-2 mx-3"
                                        value={data.password}
                                        onChange={(event)=>{
                                        setData({...data,password:event.target.value})}}
                                    />
                                    <button
                                        name="loginSubmit"
                                        className="bg-blackblue text-white p-3 text-2xl w-[35%] rounded-lg my-2 mx-3 items-center"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserSignUp
