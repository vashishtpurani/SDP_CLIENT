import background from "../assets/images/user/papergavel.jpg";
import React from "react";
import { useNavigate } from "react-router-dom";
import {MdGavel} from "react-icons/md";

const LandingPage = () => {
    const navigate = useNavigate();

    function redOtpp() {
        navigate('/otpp');
    }

    function redLogin() {
        navigate('/login');
    }

    return (
        <div className="relative bg-bgblackblue h-screen w-screen">
            <img
                src={background}
                className="absolute object-cover w-full h-full inset-0 z-0"
                alt=""
            />
            <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-opacity-75 bg-black text-white z-10">
                <div className="text-2xl font-semibold font-serif flex ">Nyay <MdGavel className={"mt-1"}/> Sarathi</div>
                <ul className="flex space-x-4">
                    <li className="text-sm font-medium">
                        <button className="hover:text-gray-300 text-2xl hover:underline" onClick={redOtpp}>Signup</button>
                    </li>
                    <li className="font-medium text-2xl">
                        |
                    </li>
                    <li className="text-sm font-medium">
                        <button className="hover:text-gray-300 text-2xl hover:underline" onClick={redLogin}>Login</button>
                    </li>
                </ul>
            </nav>
            <div className="absolute bottom-0 left-0 p-6">
                <h2 className="text-white text-9xl font-mono font-bold ">Justice for All, One Case at a Time</h2>
            </div>
        </div>
    );
};

export default LandingPage;
