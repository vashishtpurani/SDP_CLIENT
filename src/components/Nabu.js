import React, { useState } from 'react';
import axios from 'axios';

const Nabu = ({ onFilter }) => {
    const baseURL = 'http://localhost:5000/';
    const token = sessionStorage.getItem('token');
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });



    const handleFilterClick = (category, e) => {
        // e.preventDefault();
        sessionStorage.setItem("filter", category);
        onFilter(category); // Call the onFilter prop with the selected category
    };


    return (
        <nav className="bg-searchbardown top-0">
            <div className="bg-searchbarup">
                <div className="flex justify-center p-5">
                    <input
                        type="text"
                        className="bg-white text-gray-900 focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-3/4 appearance-none leading-normal"
                        placeholder="Search"
                    />
                </div>
            </div>
            {/*<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">*/}
                <div className="p-5 space-x-20">
                        {/*<div className="ml-10 flex items-baseline space-x-5">*/}
                            <button
                                className="text-gray-300 hover:text-white rounded-md text-sm font-medium"
                                onClick={() => handleFilterClick('crime')}
                            >
                                CRIME
                            </button>
                            <button

                                className="text-gray-300 hover:text-white rounded-md text-sm font-medium"
                                onClick={(e) => handleFilterClick('civil', e)}
                            >
                                CIVIL
                            </button>
                            <button
                                className="text-gray-300 hover:text-white rounded-md text-sm font-medium"
                                onClick={(e) => handleFilterClick('matrimonial', e)}
                            >
                                MATRIMONIAL
                            </button>
                        {/*</div>*/}
                </div>
            {/*</div>*/}
        </nav>
    );
};

export default Nabu;
