import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import OtpInput from 'react-otp-input'

const OtpVerify = () => {
    const navigate = useNavigate()
    const baseUrl = "http://localhost:5000/"

    const [otp, setOtp] = useState()
    const [data, setData] = useState({ number: '' })
    const [verify, setVerify] = useState({ number: "", otp: "" })
    const [click, setClick] = useState(true)

    let res

    const OTPP = async (event) => {
        event.preventDefault();

        await axios.post(baseUrl + "user/sendOtp", data).then(() => {
            console.log(data);
        });

        sessionStorage.setItem("num", data.number);
        setVerify({ ...verify, number: data.number });
        console.log(data);

        setClick(false);
    };

    const ver = async (event) => {
        event.preventDefault();
        console.log(verify);

        try {
            res = await axios.post(baseUrl + "user/verify", verify);

            if (res.status === 200) {
                console.log();
                sessionStorage.setItem("token", res.data.token);
                navigate("/signup");
            }
        } catch (e) {
            // Handle error
        }
    };

    return (
        <div className="flex items-center justify-center content-center p-3 h-screen w-screen bg-veryLightBlue">
            <div className="p-10 h-auto p-8 mx-auto my-auto rounded-md shadow-lg bg-darkBlue">
                <form className="space-y-4">
                    {click ? (
                        <div>
                            <div className="text-2xl font-bold mb-4">OTP Verification</div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Enter your Phone Number</label>
                                <PhoneInput
                                    defaultCountry={"IN"}
                                    className="w-full p-4 rounded-md focus:outline-none focus:border-polyblue PhoneInputInternationalIconGlobe"
                                    defaultValue={sessionStorage.getItem("num")}
                                    value={data.number}
                                    onChange={(val) => setData({ number: val })}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="mb-4">
                            <div className="text-2xl font-bold mb-4">Please enter your otp</div>
                            {/*<label className="block text-sm font-medium text-gray-700">OTP:</label>*/}
                            <div>
                                <OtpInput
                                    className="border-2 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                                    value={verify.otp}
                                    onChange={(val) => setVerify({ ...verify, otp: val })}
                                    numInputs={4}
                                    isInputNum={true}
                                    shouldAutoFocus={true}
                                    inputStyle={{
                                        border: "1px solid transparent",
                                        borderRadius: "8px",
                                        width: "54px",
                                        height: "54px",
                                        fontSize: "12px",
                                        color: "#000",
                                        fontWeight: "400",
                                        caretColor: "blue"
                                    }}
                                    focusStyle={{
                                        border: "1px solid #CFD3DB",
                                        outline: "none"
                                    }}
                                    renderSeparator={<span className="w-0.5"></span>}
                                    renderInput={(props) => <input {...props} />}
                                />
                            </div>
                        </div>
                    )}
                    <div className="mb-4 w-full justify-center items-center content-center flex">
                        <button
                            className="otp-button hover:scale-105 transition-transform duration-300"
                            onClick={click ? OTPP : ver}
                        >
                            {click ? "Send OTP" : "Verify OTP"}
                        </button>
                    </div>
                    <div className={"flex flex-col h-full w-full"}>
                        <p>Otp not received? <button className={"italic hover:-hue-rotate-60"}>resend</button></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default OtpVerify
