import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from "../../common/ErrorMessage";
import { isEmpty } from "../../../helpers/input-validation.helper";
import TextBox from '../../common/TextBox';
import AccentButton from '../../common/AccentButton';
import { brandsLoadedAsync } from '../../../redux/actions/admin-panel/brand.actions';
import { clearProductsAddedSuccessMsg } from '../../../redux/actions/admin-panel/product.actions';
import Files from 'react-butterfiles';
import { ChromePicker } from 'react-color'
import InputColor from 'react-input-color';

import '../../../styles/common/IconButton.css'
import SuccessMessage from '../../common/SuccessMessage';




export default function AdminAddBrandsForm({onAddBrandClick}) {

    const dispatch = useDispatch();
    const brands = useSelector(state => state.brand.brands);

    const errorMsg = useSelector(state => state.product.errorMsg);
    const successMsg = useSelector(state => state.product.successMsg)

    console.log(successMsg)
  
   
    const [name, setName] = useState("");
    const [images, setImages] = useState([]);

    const [invalidInput, setInvalidInput] = useState("");
    const [validInput, setValidInput] = useState("");


    useEffect(() => {
        dispatch(brandsLoadedAsync());
        dispatch(clearProductsAddedSuccessMsg());
        
    }, [])

    

    const handleImages = (image, index) => {
        if (index === images.length) {
            setImages([...images, ...image]);
        } else {
            let updatedImages = [...images.slice(0, index - 1), ...image, ...images.slice(index + 1)]
            setImages(updatedImages)
        }

    }
    const removeImage = (index) => {
        images.splice(index, 1);
        setImages([...images]);
    }

    const handleImageErrors = (error) => {
        console.log(error);
    }

          
    const submitForm = async () => {  
         
        if (isEmpty(name)) {
            setInvalidInput("product name is required");
            setValidInput("");
        }
        else {
            const formData = new FormData();

            formData.append('name', name)

            images.forEach((image, i, a) => {
                formData.append(`images[]`, image.src.file);
            })

            setInvalidInput("");
            
            onAddBrandClick(
                formData
            );

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
                            name="product_name"
                            placeholder="Enter Product name here"
                            label="Prodcut name"
                            onTextChange={text => setName(text)} />
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div class="col">

                        <div>
                            <Files
                                multiple
                                convertToBase64
                                accept={["image/jpg", "image/jpeg", "image/png"]}
                                onError={handleImageErrors}
                                onSuccess={files =>
                                    // Will append images at the end of the list.
                                    this.handleImages(files, images.length)
                                }
                            >
                                {({ browseFiles, getDropZoneProps }) => (
                                    <div

                                    >
                                        <p>Product images (Max 3 images)</p>
                                        <div className="image-upload-list">
                                            {images.map((image, index) => (
                                                <li className="image-item"
                                                    style={{ width: '100px', height: '120px' }}
                                                    key={index}

                                                >
                                                    <span onClick={() => removeImage(index)} className="remove-image-btn">X</span>
                                                    <img alt="product image" src={image.src.base64} style={{ width: '100%' }} />
                                                </li>
                                            ))}
                                            <li
                                                className="new-image"
                                                onClick={() => {
                                                    browseFiles({
                                                        onErrors: handleImageErrors,
                                                        onSuccess: files => {

                                                            handleImages(
                                                                files,
                                                                images.length
                                                            );
                                                        }
                                                    });
                                                }}
                                            >
                                                <div>+</div>
                                            </li>
                                        </div>
                                    </div>
                                )}
                            </Files>

                        </div>

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
