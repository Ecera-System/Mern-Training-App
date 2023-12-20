import React from "react";
import ReCAPTCHA from "react-google-recaptcha";


const RecaptchaForm = () => {
    console.log(import.meta.env.VITE_SITE_KEY)
    function onCaptchaChange(value) {
        console.log("Captcha value:", value);
    }
    return (
        <div 
        className="w-full my-5 mx-auto flex justify-center align-middle"
        >
            <ReCAPTCHA
            className="w-full my-5 mx-auto flex justify-center align-middle"
             sitekey={`${import.meta.env.VITE_SITE_KEY}`} onChange={onCaptchaChange} />
        </div>
    )
}

export default RecaptchaForm;