// TODO:DEPRECATED CODE REMOVE AFTER
// import {useEffect, useState} from "react";
// import axios from "axios";
// import {useNavigate} from "react-router-dom";
//
// const LawHome = ()=>{
//     let res
//     const [isLoading, setIsLoading] = useState(true);
//     const [data,setData] = useState()
//     const navigate = useNavigate()o
//     const baseURL="http://localhost:5000/"
//     const token = sessionStorage.getItem("lawToken")
//     const [selectedId, setSelectedId] = useState(null)
//     useEffect(()=>{
//         if(!token) navigate('/login')
//     },[])
//     const authAxios = axios.create({
//         baseURL:baseURL,
//         headers:{
//             Authorization:`Bearer ${token}`
//         }
//     })
//     const fetchQueries = async()=>{
//         console.log(token)
//         res = await authAxios.get('/law/reqQuery')
//         // console.log(res.data.data)
//         setData(res.data.data)
//         setIsLoading(false);
//         console.log(data)
//     }
//     const ansQuery = (id) =>{
//         console.log(id)
//         // navigate('/')
//     }
//     const closeModal = () => {
//         // Close the modal by resetting the selected ID
//         setSelectedId(null);
//     };
//     useEffect(()=>{
//         fetchQueries()
//     },[])
//     return(
//         // <div className="p-4">
//         //         <h1 className="text-2xl font-bold mb-4">Queries:</h1>
//         //         <div className="space-y-4">
//         //
//         //             {data.map((item, index) => (
//         //             <div key={item._id} className="bg-white rounded-lg p-4 shadow-md">
//         //                 <p className="font-bold">Query {index + 1}:</p>
//         //                 <p className="text-gray-500">User ID: {item.uId}</p>
//         //                 <p className="text-gray-500">Query: {item.query}</p>
//         //                 <p className="text-gray-500">Classified: {item.Classified}</p>
//         //                 <p className="text-gray-500">Status: {item.Status ? "true" : "false"}</p>
//         //             </div>
//         //             ))}
//         //         </div>
//         // </div>
//
//         //this has a better layout , it is with skeleton is there is no data
//         // <div className="p-4">
//         //     <h1 className="text-2xl font-bold mb-4">Queries:</h1>
//         //     {isLoading ? (
//         //         // Render a loading skeleton or spinner while isLoading is true
//         //         <div className="animate-pulse">Loading...</div>
//         //     ) : (
//         //         <div className="space-y-4">
//         //             {data.map((item, index) => (
//         //                 <div key={item._id} className="bg-white rounded-lg p-4 shadow-md">
//         //                     <p className="font-bold">Query {index + 1}:</p>
//         //                     <p className="text-gray-500">User ID: {item.uId}</p>
//         //                     <p className="text-gray-500">Query: {item.query}</p>
//         //                     <p className="text-gray-500">Classified: {item.Classified}</p>
//         //                     <p className="text-gray-500">Status: {item.Status ? "true" : "false"}</p>
//         //                     <p className="text-gray-500">
//         //                         <button
//         //                             onClick={() => ansQuery(item._id)} // Pass the ID to the click handler
//         //                             className="bg-blue-500 text-white px-3 py-1 rounded-md mt-2"
//         //                         >
//         //                             Send ID
//         //                         </button>
//         //                     </p>
//         //                 </div>
//         //             ))}
//         //         </div>
//         //     )}
//         // </div>
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Queries:</h1>
//             {isLoading ? (
//                 <div className="animate-pulse">Loading...</div>
//             ) : (
//                 <div className="space-y-4">
//                     {data.map((item, index) => (
//                         <div key={item._id} className="bg-white rounded-lg p-4 shadow-md">
//                             <p className="font-bold">Query {index + 1}:</p>
//                             <p className="text-gray-500">User ID: {item.uId}</p>
//                             <p className="text-gray-500">Query: {item.query}</p>
//                             <p className="text-gray-500">Classified: {item.Classified}</p>
//                             <p className="text-gray-500">Status: {item.Status ? "true" : "false"}</p>
//                             <button
//                                 onClick={() => ansQuery(item._id)}
//                                 className="bg-blue-500 text-white px-3 py-1 rounded-md mt-2"
//                             >
//                                 Send ID
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}
//
//             {selectedId && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50">
//                     <div className="bg-white p-8 rounded-lg shadow-lg">
//                         <h2 className="text-2xl font-bold mb-4">Modal Content</h2>
//                         <p>Selected ID: {selectedId}</p>
//                         <button
//                             onClick={closeModal}
//                             className="bg-blue-500 text-white px-3 py-1 rounded-md mt-4"
//                         >
//                             Close Modal
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//
//     )
// }
// export default LawHome
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {GrFormClose} from "react-icons/gr";

const LawHome = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [inputValue, setInputValue] = useState({
        Ans:'',
        id:''
    }); // Add state for the input field
    const navigate = useNavigate();
    const baseURL = "http://localhost:5000/";
    const token = sessionStorage.getItem("lawToken");

    useEffect(() => {
        if (!token) navigate("/login");
    }, []);

    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const fetchQueries = async () => {
        try {
            const response = await authAxios.get("/law/reqQuery");
            setData(response.data.data);
            console.log(response)
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching queries:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    const handleButtonClick = (id) => {
        setInputValue({...inputValue,id:id})
        setSelectedId(id);
    };

    const closeModal = () => {
        setSelectedId(null);
        setInputValue({...inputValue,Ans:'',id:''}); // Reset input value when closing the modal
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = async(event) => {
        event.preventDefault();
        console.log("Input value:", inputValue);
        const responce = await authAxios.post('/law/ansQuery',inputValue)
        console.log(responce)
        setSelectedId(null);

    };

    return (
        <div className="min-h-screen bg-gray-600">
        <div className="p-4 text">
            <h1 className="text-2xl font-bold mb-4 ">Queries:</h1>
            {isLoading ? (
                <div className="animate-pulse">Loading...</div>
            ) : (
                <div className="space-y-4">
                    {data.map((item, index) => (
                        <div key={item._id} className="bg-gray-800 rounded-lg p-4 shadow-md">
                            <p className="font-bold text-gray-300">Query {index + 1}:</p>
                            <p className="text-gray-400">User ID: {item.uId}</p>
                            <p className="text-gray-400">Query: {item.query}</p>
                            <p className="text-gray-400">Classified: {item.Classified}</p>
                            <p className="text-gray-400">Status: {item.Status ? "true" : "false"}</p>
                            <button
                                onClick={() => handleButtonClick(item._id)}
                                className="bg-teal-500 text-white px-3 py-1 rounded-md mt-2"
                            >
                                Ans
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {selectedId && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 backdrop-blur-md"></div>
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg relative z-10">
                        <h2 className="text-2xl font-bold mb-4 text-gray-300">Modal Content</h2>
                        <form >
                            <div className="mb-4">
                                <label htmlFor="inputField" className="block text-sm font-medium text-gray-400">
                                    Ans Query:
                                </label>
                                <input
                                    type="text"
                                    id="inputField"
                                    className="mt-1 p-2 block w-full bg-gray-600 border rounded-md bg-gray-100 focus:bg-gray-700 text-gray-200"
                                    value={inputValue.Ans}
                                    onChange={(event)=>{
                                        setInputValue({...inputValue,Ans:event.target.value})}}
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-teal-500 text-white px-3 py-1 rounded-md mt-4"
                                onClick={handleFormSubmit}
                            >
                                Submit
                            </button>
                        </form>
                        <button onClick={closeModal} className="absolute top-3 right-4 text-gray-600 left-70 bg-gray-600 rounded-full">
                            <GrFormClose/>
                        </button>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default LawHome;
