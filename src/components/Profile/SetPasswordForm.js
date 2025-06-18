import logo from "../../assets/images/logo_img.png";
import { useFormValidation } from "../../utils/validate";
import { PasswordInput } from "../Authen/InputField";

const SetPasswordForm = () => {
    const { values, errors, showPassword, handleChange, handleSubmit, togglePasswordVisibility } = useFormValidation({
        newPassword: '',
        confirmPassword: '',
    });

    const onSubmit = (values) => {
        console.log('Set Password Form submitted:', values);
        // Xử lý đặt mật khẩu
    };

    return (
        <div className="text-left border-solid border-0 border-t-[5px] border-t-[#3DB3FB] border-b-[5px] border-b-[#2BB673] max-w-4xl w-full px-32 bg-white max-h-min">
            <div className="flex items-center gap-4 py-6">
                <img src={logo} alt="" />
                <h2 className="text-2xl font-bold">Set your password</h2>
            </div>
            <p className="font-semibold">Hi,</p>
            <br />
            <p>Please enter password and confirm to set password.</p>
            <form className="py-6" onSubmit={handleSubmit(onSubmit)}>
                <PasswordInput
                    name="newPassword"
                    placeholder="Enter your new password"
                    value={values.newPassword}
                    error={errors.newPassword}
                    onChange={handleChange}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    className="mt-5"
                />
                <PasswordInput
                    name="confirmPassword"
                    placeholder="Confirm your new password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword}
                    onChange={handleChange}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    className="mt-5"
                />
                <div className="flex justify-center pt-5">
                    <button
                        type="submit"
                        className="text-white text-lg bg-[#3DB3FB] hover:bg-blue-500 font-bold rounded-sm w-48 py-2.5"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SetPasswordForm;