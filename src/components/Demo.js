import React, { useEffect, useState } from "react"

const Chatmain = () => {
    const [selected, setSelected] = useState(false)

    const changeSelected = () => {
        setSelected((prevSelected) => !prevSelected)
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gradient-to-r from-amber-500 to-pink-500 w-screen h-screen flex justify-center items-center text-center content-center">
                <div className="bg-offwhite backdrop-blur-lg mx-auto my-auto w-[50%] h-[50%] flex flex-row justify-center rounded-2xl">
                    <div className="w-[30%] h-[30%] mx-auto my-auto bg-gradient-to-r from-polyblue to-emerald-600 rounded-md flex relative">
                        <div
                            className="w-1/2 h-full text-center flex items-center justify-center cursor-pointer"
                            onClick={changeSelected}
                        >
                            lawyer
                        </div>
                        <div
                            className="w-1/2 h-full text-center flex items-center justify-center cursor-pointer"
                            onClick={changeSelected}
                        >
                            user
                        </div>
                        <div
                            className={`absolute top-0 h-full w-1/2 bg-white opacity-40 transition-transform duration-1000 ease-in-out 
                            ${selected ? "transform translate-x-0" : "transform translate-x-full"}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatmain
