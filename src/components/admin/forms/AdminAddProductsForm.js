import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from "../../common/ErrorMessage";
import { isEmpty } from "../../../helpers/input-validation.helper";
import TextBox from '../../common/TextBox';
import AccentButton from '../../common/AccentButton';
import { brandsLoadedAsync, clearBrandsAsync } from '../../../redux/actions/admin-panel/brand.actions';
import { clearProductsAddedSuccessMsg } from '../../../redux/actions/admin-panel/product.actions';
import Files from 'react-butterfiles';

import '../../../styles/common/IconButton.css'
import SuccessMessage from '../../common/SuccessMessage';




export default function AdminAddProductsForm({onAddProductClick,onAddBrandClick}) {

    const dispatch = useDispatch();
    const brands = useSelector(state => state.brand.brands);

    const errorMsg = useSelector(state => state.product.errorMsg);
    const successMsg = useSelector(state => state.product.successMsg)

    console.log(successMsg)

    

   
   
    const [name, setName] = useState("");
    const [qty_small, setQtyS] = useState("");
    const [qty_medium, setQtyM] = useState("");
    const [qty_large, setQtyL] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [colors, setColors] = useState("");
    const [tags, setTags] = useState("");
    const [description, setDescription] = useState("");


    const [images, setImages] = useState([]);

    const [bname, setBrandname] = useState("");

    const sizeQty = [
        { size: "S", qty: qty_small },
        { size: "M", qty: qty_medium },
        { size: "L", qty: qty_large }
    ];



    const [invalidInput, setInvalidInput] = useState("");
    const [validInput, setValidInput] = useState("");

    const submitClearAll = () => {
        dispatch(clearBrandsAsync());
    } 

    const submitBrand = () => {
        if (isEmpty(bname)) {
            setInvalidInput("brand name is required");
        } else {
            setInvalidInput("");
            onAddBrandClick(bname);
        }


    }
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

        } else if (isEmpty(sizeQty)) {
            setInvalidInput("product sizes and qtys is required");
            setValidInput("");
    


        } else if (isEmpty(brand)) {
            setInvalidInput("product brand is required");
            setValidInput("");

        } else if (isEmpty(category)) {
            setInvalidInput("product category is required");
            setValidInput("");

        } else if (isEmpty(subCategory)) {
            setInvalidInput("product category is required");
            setValidInput("");

        } else if (isEmpty(price)) {
            setInvalidInput("product price is required");
            setValidInput("");

        } else if (price < 0) {
            setInvalidInput("product price shouldn't be less than 0");
            setValidInput("");

        } else if (isEmpty(discount)) {
            setInvalidInput("product discount is required");
            setValidInput("");

        } else if (discount < 0) {
            setInvalidInput("product discount shouldn't be less than 0");
            setValidInput("");

        } else if (isEmpty(colors)) {
            setInvalidInput("product colors is required");
            setValidInput("");

        } else if (isEmpty(tags)) {
            setInvalidInput("product tags is required");
            setValidInput("");

        } else if (isEmpty(description)) {
            setInvalidInput("product description is required");
            setValidInput("");

        }
        else {
            const formData = new FormData();

            formData.append('name', name)

            formData.append('sizeQty', JSON.stringify(sizeQty));

            formData.append('brand', brand)
            formData.append('category', category)
            formData.append('subCategory', subCategory)
            formData.append('price', price)
            formData.append('discount', discount)
            formData.append('colors', colors)
            formData.append('tags', tags)
            formData.append('description', description)

            images.forEach((image, i, a) => {
                formData.append(`images[]`, image.src.file);
            })



            setInvalidInput("");
            
            onAddProductClick(
                formData
            );

            setValidInput(successMsg);
            

           
            
        }
    }
    

    return (
        <div>




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
                <div className="row">
                    <div className="col-md-4">
                        <TextBox
                            name="small_product_qty"
                            placeholder="Enter Small Qty here"
                            label="Prodcut Small Qty"
                            type="number"
                            onTextChange={text => setQtyS(text)} />
                    </div>


                    <div className="col-md-4">
                        <TextBox
                            name="medium_product_qty"
                            placeholder="Enter Medium qty here"
                            label="Prodcut medium qty"
                            onTextChange={text => setQtyM(text)} />
                    </div>
                    <div className="col-md-4">
                        <TextBox
                            name="large_product_qty"
                            placeholder="Enter Large qty here"
                            label="Prodcut large qty"
                            onTextChange={text => setQtyL(text)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Brands :</label>

                        <div className="select">

                            <select id="leave" onChange={e => { setBrand(e.target.value); console.log(e.target.value) }}>
                                {brands && brands.map(brand => (
                                    <option value={brand.name}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <button class="iconBtn" onClick={submitClearAll}><i class="fa fa-trash"></i> clearAll</button>
              </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                    <div className="col-md-9"  >
                    <TextBox 
                    name="product_brand"
                    placeholder="You can add a brand here"
                    label="Prodcut brand"
                    onTextChange={text => setBrandname(text)} />
                    </div>
                    <div className="col-md-3">
                    <button class="iconBtn" onClick={submitBrand}><i class="fa fa-plus"></i></button>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-9"  >
                                <TextBox
                                    name="product_brand"
                                    placeholder="You can add a brand here"
                                    label="Prodcut brand"
                                    onTextChange={text => setBrandname(text)} />
                            </div>
                            <div className="col-md-3">
                                <button class="iconBtn" onClick={submitBrand}><i class="fa fa-plus"></i></button>
                            </div>
                        </div>
                    </div>

</div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Category</label>

                        <div className="select">

                            <select id="leave" onChange={e => { setCategory(e.target.value); console.log(e.target.value) }}>
                                <option value="Mens">Mens</option>
                                <option value="Womens">Womens</option>

                            </select>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <label>Sub-Category</label>
                        <div className="select">
                            <select id="leave" onChange={e => { setSubCategory(e.target.value); console.log(e.target.value) }}>
                                <option value="Shirts">Shirts</option>
                                <option value="Trousers">Trousers</option>
                                <option value="Blousers">Blousers</option>
                                <option value="Frocks">Frocks</option>

                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <TextBox
                            name="product_price"
                            placeholder="Enter Product price here"
                            label="Prodcut price"
                            type="number"
                            pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                            onTextChange={text => setPrice(text)} />
                    </div>
                    <div className="col-md-6">
                        <TextBox
                            name="product_discount"
                            placeholder="Enter Product discount here"
                            label="Prodcut discount"
                            type="number"
                            onTextChange={text => setDiscount(text)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <TextBox
                            name="product_colors"
                            placeholder="Enter Product colors here"
                            label="Prodcut colors"
                            onTextChange={text => setColors(text)} />
                    </div>
                    <div className="col-md-6">
                        <TextBox
                            name="product_tags"
                            placeholder="Enter Product tags here"
                            label="Prodcut tags"
                            onTextChange={text => setTags(text)} />
                    </div>
                </div>
                <TextBox
                    name="product_description"
                    placeholder="Enter Product description here"
                    label="Prodcut description"
                    type="textarea"
                    onTextChange={text => setDescription(text)} />

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
