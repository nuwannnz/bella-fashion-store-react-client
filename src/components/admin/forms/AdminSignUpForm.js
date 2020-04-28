import React, { useState } from "react";
import ErrorMessage from "../../common/ErrorMessage";
import { isEmpty, isValidEmail } from "../../../helpers/input-validation.helper";
import TextBox from '../../common/TextBox';
import AccentButton from '../../common/AccentButton';

export default function AdminSignUpForm({ onSignUpClick, errorMsg = "" }) {
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


            <TextBox
                name="email"
                placeholder="Enter email here"
                label="Email"
                onTextChange={text => setEmail(text)} />


            <TextBox
                name="fname"
                placeholder="Enter first name here"
                label="First name"
                onTextChange={text => setFName(text)} />



            <TextBox
                name="lname"
                placeholder="Enter last name here"
                label="Last name"
                onTextChange={text => setLName(text)} />

            {
                invalidInput !== null && invalidInput.length > 0 ?
                    <ErrorMessage msg={invalidInput} />
                    : null
            }

            {errorMsg.length > 0 ?
                <ErrorMessage msg={errorMsg} />
                : null
            }


            <AccentButton onButtonClick={submitForm} text="Sign up" />

        </div>
    );
}
