import React, { useEffect, useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
// import Side from './searchbar'

const Chatmain = () => {
    const images = [
        'https://media.istockphoto.com/id/1003169674/photo/3d-rendering-of-thor-hammer.jpg?s=612x612&w=0&k=20&c=65qglzpM4qsCuBfH72L0ohmatjsuXRc1XnJOfX_GDGM=',
        'https://media.istockphoto.com/id/1003169700/photo/3d-rendering-of-thor-hammer.jpg?s=612x612&w=0&k=20&c=mGIhB85AcvrwHH6T2IxnG0rZ3v1obbA7rj_FJX_UkzI=',
        // 'https://m.media-amazon.com/images/I/715VSYBdLgL.jpg',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isInStock, setIsInStock] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [currentImageIndex, images.length]);

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        console.log("licking ballszzz");
    };

    const handleAddToWishlist = () => {
        console.log("licking balls");
    };
    const check = ()=>{
        // if(!abc){
        //     return "invisible"
        // }
    }

    return (
        <div className={`flex flex-col w-fit h-fit ${check()}`}>
            <div className={"fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md"}>
                <div className={"bg-gray-800 p-8 rounded-lg shadow-lg relative z-10"}>
                    no
                </div>
            </div>
            <div className="flex justify-center items-center rounded-lg h-full bg-sky-600 mt-10 font-sans">
                <div className="flex flex-col h-fit items-center">
                    <div className="flex w-3/4 flex-row h-fit bg-fuchsia-700 relative">
                        <button className="absolute left-0 top-1/2 transform -translate-y-1/2" onClick={handlePrevClick}>
                            <FaCaretLeft />
                        </button>
                        <img
                            src={images[currentImageIndex]}
                            alt={`Slide ${currentImageIndex + 1}`}
                            className="w-full h-full object-contain"
                        />
                        <button className="absolute right-0 top-1/2 transform -translate-y-1/2" onClick={handleNextClick}>
                            <FaCaretRight />
                        </button>
                    </div>
                    <div className="w-1/4 flex justify-center items-center mt-4">
                        {images.map((image, index) => (
                            <div className={"flex flex-col"}>
                                asdasd
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Preview ${index + 1}`}
                                    className="w-16 h-12 object-cover mx-2 cursor-pointer"
                                    onClick={() => setCurrentImageIndex(index)}
                                /><br/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/3 mt-4 h-[43rem] overflow-y-scroll bg-indigo-600 p-6 rounded-md">
                    <h2 className="text-white text-2xl font-bold ">Mjolnir YOLO YOLO LIGMA</h2>
                    <h3 className={"text-gray-300 text-1xl font-thin mb-2"}>crime</h3>
                    <p className="text-white mb-4 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula auctor massa in efficitur.
                        Fusce fermentum, neque id fermentum posuere, dui neque ullamcorper metus, a gravida sapien velit
                        in turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula auctor massa in efficitur.
                        Fusce fermentum, neque id fermentum posuere, dui neque ullamcorper metus, a gravida sapien velit
                        in turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula auctor massa in efficitur.
                        Fusce fermentum, neque id fermentum posuere, dui neque ullamcorper metus, a gravida sapien velit
                        in turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula auctor massa in efficitur.

                    </p>
                    <div className="flex items-center mb-4">
                        <span className="text-yellow-500 text-xl">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                        <span className="text-white ml-2">5 stars</span>
                    </div>
                </div>
                <div className="w-1/3 h-[40rem] bg-amber-500 p-6 rounded-md">
                    <h2 className="text-white text-2xl font-bold mb-4">150rs</h2>
                    <p className="text-white text-lg mb-2">Free Delivery</p>
                    <div className="flex items-center mb-2">
                        <label htmlFor="quantity" className="text-white mr-2">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="w-16 border rounded p-2"
                        />
                    </div>
                    {isInStock ? (
                        <div className="mb-4">
                            <button
                                onClick={handleAddToCart}
                                className="bg-cyan-800 text-white px-4 py-2 rounded mr-4"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleAddToWishlist}
                                className="bg-violet-600 text-white px-4 py-2 rounded"
                            >
                                Add to Wishlist
                            </button>
                        </div>
                    ) : (
                        <p className="text-red-500">Out of Stock</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Chatmain;
