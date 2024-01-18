import React, { useEffect, useRef } from "react";

const Chatmain = () => {
    const chatRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when the component mounts
        // chatRef.current.scrollIntoView({ behavior: "instant" });
    }, []);

    return (
            <div className={"flex flex-row"}>
                <div className={"w-14 h-screen bg-red-900 top-0 left-0"}>
                    abcd
                </div>

                <div className={"flex flex-col h-screen w-72"}>
                    <div className={" text-center p-4 bg-green-500"}>
                        <div>
                            search
                        </div>
                    </div>
                    <div className={"bg-searchbardown h-full text-center overscroll-contain overflow-auto scrolling-touch"}>
                        dms and shit <br/>
                    </div>
                </div>
                <div className={"flex flex-col w-screen"}>
                    <div className={"bg-amber-600 p-4 w-full text-center"}>
                        name and shit
                    </div>
                    <div className={"bg-blue-700 h-full w-full flex flex-col-reverse p-3"}>
                        <div className="flex">
                            <input placeholder="Type your message..."
                                   className="focus:ring-gray-900 focus:border-gray-900 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200"
                            />
                        </div>
                        <div className={"p-3 bg-amber-300 mt-4 mb-4 h-full w-full overflow-y-auto"}>
                            <div className="flex items-end">
                                <div
                                    className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                    <div>
                                        <span
                                            className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                                            ligma balls
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-end justify-end">
                                <div
                                    className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
                                    <div>
                                        <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-navyblue text-white">
                                            yes i will
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col w-5/12"}>
                    <div className={"bg-fuchsia-700 p-4"}>
                        asdasd
                    </div>
                    <div className={"bg-indigo-600 h-full"}>
                        asdasdasd
                    </div>
                </div>
            </div>
    );
};

export default Chatmain;
