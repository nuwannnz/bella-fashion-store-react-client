import React, { useState } from "react";
import ErrorMessage from "../../common/ErrorMessage";
import { isEmpty, isLengthOf, } from "../../../helpers/input-validation.helper";
import TextBox from '../../common/TextBox';
import AccentButton from '../../common/AccentButton';

export default function AdminSignUpForm({ onUpdateClick, errorMsg = "" }) {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [invalidInput, setInvalidInput] = useState("");



    const submitForm = () => {
        console.log('checking form', password)
        setInvalidInput("");
        if (isEmpty(password)) {
            setInvalidInput("Password is required");

        } else if (password !== passwordConfirm) {
            setInvalidInput("Password and confirm password must match");
        } else if (password.length < 6) {
            setInvalidInput("Password must include atleast 6 characters");

        } else {
            setInvalidInput("");
            onUpdateClick(password);
        }


    }

    return (
        <div className="login-form-wrapper">


            <TextBox
                name="password"
                type="password"
                placeholder="Enter password here"
                label="Password"
                onTextChange={text => setPassword(text)} />


            <TextBox
                name="confirmPassword"
                type="password"
                placeholder="Enter password again"
                label="Confirm password"
                onTextChange={text => setPasswordConfirm(text)} />




            {
                invalidInput !== null && invalidInput.length > 0 ?
                    <ErrorMessage msg={invalidInput} />
                    : null
            }

            {errorMsg.length > 0 ?
                <ErrorMessage msg={errorMsg} />
                : null
            }


            <AccentButton onButtonClick={() => { submitForm() }} text="Update password" />

        </div>
    );
}
