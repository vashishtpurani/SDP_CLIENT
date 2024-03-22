import React, { useState } from 'react';

const Test = () => {
    const [options, setOptions] = useState([
        { id: 1, text: 'Option A', count: 0 },
        { id: 2, text: 'Option B', count: 0 },
        { id: 3, text: 'Option C', count: 0 },
    ]);

    const totalVotes = options.reduce((acc, option) => acc + option.count, 0);

    const handleVote = (optionId) => {
        setOptions(options.map(option =>
            option.id === optionId ? { ...option, count: option.count + 1 } : option
        ));
    };

    return (
        <div className="max-w-md w-full rounded-md overflow-hidden shadow-lg bg-gray-800 text-white">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Poll</div>
                {options.map(option => (
                    <div key={option.id} className="mb-4">
                        <button
                            onClick={() => handleVote(option.id)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2 transition duration-300 ease-in-out transform hover:scale-110"
                        >
                            {option.text}
                        </button>
                        <span className="text-gray-300">{option.count} votes</span>
                        <div className="bg-gray-600 h-2 mt-2 rounded-full">
                            <div
                                className="bg-green-500 h-full rounded-full"
                                style={{ width: `${(option.count / totalVotes) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Test;
