import { useEffect, useState } from "react";
import logo from "../../assets/images/logo_img.png";
import { useFormValidation } from "../../utils/validate";
import { TextInput } from "./InputField";

const ConfirmOtpForm = () => {
    const [secondsLeft, setSecondsLeft] = useState(60);
    const { values, errors, handleChange, handleSubmit } = useFormValidation({
        otp: '',
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev === 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const onSubmit = (values) => {
        console.log('OTP Form submitted:', values);
        // Xử lý gửi OTP
    };

    return (
        <div className="text-left border-solid border-0 border-t-[5px] border-t-[#3DB3FB] border-b-[5px] border-b-[#2BB673] max-w-4xl w-full px-32 bg-white max-h-min">
            <div className="flex items-center gap-4 py-6">
                <img src={logo} alt="" />
                <h2 className="text-2xl font-bold">Reset your password</h2>
            </div>
            <p className="font-semibold">Hi,</p>
            <br />
            <p>Please open your email to get the OTP code.</p>
            <form className="py-6" onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    name="otp"
                    placeholder="Enter your OTP code"
                    value={values.otp}
                    error={errors.otp}
                    onChange={handleChange}
                />
                <div className="flex flex-col items-center pt-5">
                    <p className="py-4">
                        Code expires after:
                        <span className="text-[#EF3E36] font-bold"> {secondsLeft}s</span>
                    </p>
                    <button
                        type="submit"
                        className="text-white text-lg bg-[#3DB3FB] hover:bg-blue-500 font-bold rounded-sm w-48 py-2.5 mt-3"
                    >
                        Send OTP
                    </button>
                </div>
            </form>
            <p className="pt-6 pb-10">
                If you have not received the code, please click the following link:{' '}
                <span className="cursor-pointer underline text-[#3DB3FB]">Resend OTP</span>
            </p>
        </div>
    );
};

export default ConfirmOtpForm;