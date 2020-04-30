import React, { useState } from "react";
import ErrorMessage from "../common/ErrorMessage";
import { isEmpty, isValidEmail } from "../../helpers/input-validation.helper";

export default function AdminSignUpForm({ onSignUpClick, errorMsg }) {
    const [email, setEmail] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");

    const [invalidInput, setInvalidInput] = useState("");



    const submitForm = () => {

        if (!isValidEmail(email)) {
            setInvalidInput("Invalid email address");
        } else if (isEmpty(fName)) {
            setInvalidInput("First name is required");
        } else if (isEmpty(lName)) {
            setInvalidInput("Last name is required");
        } else {
            setInvalidInput("");
            onSignUpClick(email, fName, lName);
        }
    }

    return (
        <div className="login-form-wrapper">
            <div className="form-element-wrapper ">
                <label className="animate-label">Email</label>
                <input
                    className="textual-form-element"
                    type="text"
                    name="email"
                    placeholder="Enter email here"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </div>
            <div className="form-element-wrapper">
                <label className="animate-label"> First name</label>
                <input
                    className="textual-form-element"
                    type="text"
                    name="firstName"
                    placeholder="Enter first name here"
                    onChange={(e) => {
                        setFName(e.target.value);
                    }}
                />
            </div>

            <div className="form-element-wrapper">
                <label className="animate-label"> Last name</label>
                <input
                    className="textual-form-element"
                    type="text"
                    name="lastName"
                    placeholder="Enter last name here"
                    onChange={(e) => {
                        setLName(e.target.value);
                    }}
                />
            </div>

            {
                invalidInput !== null && invalidInput.length > 0 ?
                    <ErrorMessage msg={invalidInput} />
                    : null
            }

            {
                errorMsg.length > 0 ?
                    <ErrorMessage msg={errorMsg} />
                    : null
            }


            <button
                className="bella-accent-btn"
                onClick={submitForm}
            >
                Sign up
            </button>
        </div>
    );
}
