import React from "react";
import "../../styles/CustomerLoginForm.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { getAssetUrl } from "../../helpers/assets.helper";

// import ErrorMessage from "../common/ErrorMessage";
// import { isEmpty, isValidEmail } from "../../helpers/input-validation.helper";


export default function CustomerLoginForm() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [invalidInput, setInvalidInput] = useState("");
// }

    // const submitForm = () => {
    //     if(!isValidEmail(email)) {
    //         setInvalidInput("Invalid email address");
    //     } else if(isEmpty(password)) {
    //         setInvalidInput("Password is required");
    //     } else {
    //         setInvalidInput("");
    //         onLoginClick(email, password);
    //     }
    // }

    return (
        // <div className="login-wrapper">
        //     <div className="center">
        <div>

                <div className="customer-login-form-wrapper"> 
                    <h1 className="sign-in-text">Sign in to Bella Fashion Store</h1>
                    <img src={getAssetUrl("logo/logo.png")} alt="Bella logo"/>
                    <div className="input-box-wrap">
                        <div className="email-icon"><FaEnvelope color="#8c52ff" /></div>  
                        <input placeholder="Email" type="email" />
                        <div className="password-icon"><FaLock color="#8c52ff" /></div>  
                        <input placeholder="Password" type="password"/>
                        <div>
                            <a href className="forgot-pwd">Forgot your Password?</a>
                        </div>

                        <div className="sign-in-wrap">
                            <button className="sign-in-btn">SIGN IN</button>
                        </div>
                    </div>
                </div>
                
                {/* <div className="sign-up-right-wrapper"> 
                    <div className="sign-up-content">
                        <h2>Hi, There!</h2>
                        <p>Enter your personal details 
                            and start journey with us.
                        </p>
                        <div className="sign-up-btn-wrap">
                            <button className="sign-up-btn">SIGN UP</button>
                        </div>
                    </div>
                </div>  */}
            </div>                
        // </div>
    );

}