import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from "../../common/ErrorMessage";
import { isEmpty } from "../../../helpers/input-validation.helper";
import TextBox from '../../common/TextBox';
import AccentButton from '../../common/AccentButton';
import { sizesLoadedAsync } from '../../../redux/actions/admin-panel/size.actions';
import { clearProductsAddedSuccessMsg } from '../../../redux/actions/admin-panel/product.actions';
import SuccessMessage from '../../common/SuccessMessage';

export default function AdminAddSizesForm({onAddSizeClick}) {
    const dispatch = useDispatch();

    const errorMsg = useSelector(state => state.product.errorMsg);
    const successMsg = useSelector(state => state.product.successMsg)

    console.log(successMsg)
  
   
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [invalidInput, setInvalidInput] = useState("");
    const [validInput, setValidInput] = useState("");


    useEffect(() => {
        dispatch(sizesLoadedAsync());
        dispatch(clearProductsAddedSuccessMsg());
        
    }, [])

          
    const submitForm = async () => {  
         
        if (isEmpty(name)) {
            setInvalidInput("product name is required");
            setValidInput("");
        }
        else if (isEmpty(description)) {
            setInvalidInput("product description is required");
            setValidInput("");
        } else {
            const formData = new FormData();

            formData.set('name', name)
            formData.set('description', description)

            setInvalidInput("");
            onAddSizeClick({name, description});

            console.log(formData)

            setValidInput(successMsg);
        }
    }
        return (
            <div className="modal-style">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <TextBox
                            name="Size_name"
                            placeholder="Enter Size name here"
                            label="Size name"
                            onTextChange={text => setName(text)} />
                    </div>
                </div>
                <hr />
                <div className="row">
                <div className="col-md-12">
                        <TextBox
                            name="Size_description"
                            placeholder="Enter Size description here"
                            label="Size description"
                            onTextChange={text => setDescription(text)} />
                    </div>
                </div>

                {
                    invalidInput !== null && invalidInput.length > 0 ?
                        <ErrorMessage msg={invalidInput} />
                        : null
                }


                {errorMsg.length > 0 ?
                    <ErrorMessage msg={errorMsg} />
                    : null
}
{
                validInput !== null && validInput.length > 0 ?
                    <SuccessMessage msg={validInput} />
                    : null
}


            {errorMsg.length > 0 ?
                <ErrorMessage msg={errorMsg} />
                : null
            }
            {successMsg.length > 0 ?
                <SuccessMessage msg={successMsg} />
                : null
            }</div>

            <AccentButton onButtonClick={submitForm} text="ADD" />

            </div>
        )
    
}
