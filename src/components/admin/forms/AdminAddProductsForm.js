import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from "../../common/ErrorMessage";
import { isEmpty } from "../../../helpers/input-validation.helper";
import TextBox from '../../common/TextBox';
import AccentButton from '../../common/AccentButton';
import { brandsLoadedAsync } from '../../../redux/actions/admin-panel/brand.actions';
import { categoriesAsync } from '../../../redux/actions/admin-panel/category.actions'
import { clearProductsAddedSuccessMsg } from '../../../redux/actions/admin-panel/product.actions';
import Files from 'react-butterfiles';
import { ChromePicker } from 'react-color'
import InputColor from 'react-input-color';

import '../../../styles/common/IconButton.css'
import SuccessMessage from '../../common/SuccessMessage';




export default function AdminAddProductsForm({onAddProductClick,onAddBrandClick}) {

    const dispatch = useDispatch();
    const brands = useSelector(state => state.brand.brands);
    const categories = useSelector(state => state.category.categories )
    console.log(categories)
    const errorMsg = useSelector(state => state.product.errorMsg);
    const successMsg = useSelector(state => state.product.successMsg)

    console.log(successMsg)

    const [count, setCount] = useState(-1);
  

   const [showColorPicker, setshowColorPicker] = useState(false) 
   

   
    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const [qty, setQty] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("-1");
    const [subCategory, setSubCategory] = useState("-1");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [colors, setColors] = useState("#000000");
    const [tags, setTags] = useState("");
    const [description, setDescription] = useState("");
    const [sizeQty, setSizeQty] = useState([])
    console.log(sizeQty)
    const [images, setImages] = useState([]);
    const [subSelectedCategories, setSubCategories] = useState([{_id:'', subcategory:[{_id:'', name:''}], name: ''}]);

    const [bname, setBrandname] = useState("");

    const submitSizeQty = () => {
        if(isEmpty(size)) {
            setInvalidInput("Size is required");
        } else if(size == -1) {
            setInvalidInput("Size is required");
        } 
         else if(isEmpty(qty)) {
            setInvalidInput("quantity is required");
        } else {
    
            setSizeQty([...sizeQty, {size:size, qty:qty}]);
        }
    }

        const changeSubs = () => {
            const id = category
            console.log("id is "+id)
            const _selectedProduct = categories.find(p => p._id === id);
            setSubCategories(_selectedProduct);
        
        }
        
            

        console.log(subSelectedCategories)
        
        // _selectedCategory.map(subs => (
        //     <div>
        //     {setSubCategories(...subSelectedCategories,subs.subcategory)}
        //     </div>
        // ))
		
   
    



    const [invalidInput, setInvalidInput] = useState("");
    const [validInput, setValidInput] = useState("");

  

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

    useEffect(() => {
        dispatch(categoriesAsync())
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

    const removeData = (index) => {
        console.log(index)
        const newArray = sizeQty

        if(index != -1) {
            newArray.splice(index, 1);
            setSizeQty([...newArray]);
        }

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

        }  else if(subCategory == -1) {
            setInvalidInput("subCategory is required");

        } else if (isEmpty(category)) {
            setInvalidInput("product category is required");
            setValidInput("");

        }  else if(category == -1) {
            setInvalidInput("category is required");

        } else if (isEmpty(subCategory)) {
            setInvalidInput("product category is required");
            setValidInput("");

        } else if(subCategory == -1) {
            setInvalidInput("subCategory is required");

        }  else if (isEmpty(price)) {
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
                <div className="col-md-6">
                        <label>Select Size :</label>

                        <div className="select">

                            <select id="leave" onChange={e => { setSize(e.target.value); console.log(e.target.value) }}>
                                <option value="-1">-pick a size-</option>
                                <option value="XS">Extra-Small</option>
                                <option value="S">Small</option>
                                <option value="M">Medium</option>
                                <option value="L">Large</option>
                                <option value="XL">Extra-Large</option>
                                <option value="FressSize">FreeSize</option>

                            </select>
                        </div>

                    </div>
                    <div className="col-md-5">
                    <TextBox 
                    name="product_qty"
                    placeholder="You can enter quatity here"
                    label="Prodcut quantity"
                    onTextChange={text => setQty(text)} />
                    </div>
                    <div className="col-md-1 icon-btn">
                    <button class="iconBtn" onClick={submitSizeQty}><i class="fa fa-plus"></i></button>
                    </div>
                    </div>
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <td colSpan="3">Sizes and Quantities</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                        {sizeQty && sizeQty.map((sizes, index) => (
                                            <tr key={index}>
                                            <td>
                                                <p> {sizes.size}</p>
                                            </td>
                                        <td>
                                            <p> {sizes.qty}</p>
                                        </td>
                                        <td>
                                            <button className="button buttonDelete" onClick={() => removeData(index)}> <i className="fa fa-trash"></i> </button>
                                        </td>
                                            </tr> ))}
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <label>Brands :</label>

                        <div className="select">

                            <select id="leave" onChange={e => { setBrand(e.target.value); console.log(e.target.value) }}>
                            <option value="-1">- pick a brand -</option>
                                {brands && brands.map(brand => (
                                    <option value={brand.name}>{brand.name}</option>
                                ))}
                            </select>
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
                    <div className="col-md-3 icon-btn">
                    <button class="iconBtn" onClick={submitBrand}><i class="fa fa-plus"></i></button>
                    </div>
                  

</div>
                </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <label>Category</label>

                        <div className="select">

                            <select id="leave" onChange={e => { setCategory(e.target.value); console.log(e.target.value); changeSubs() }}>
                            <option value="-1">- pick a category -</option>
                                {categories.map( category => (
                                    <option value={category._id}>{category.name}</option>
                                ))}

                            </select>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <label>Sub-Category</label>
                        <div className="select">
                            <select id="leave" onChange={e => { setSubCategory(e.target.value); console.log(e.target.value);  }}>
                            <option value="-1">- pick a sub category -</option>

                                {
                                    category !== '-1' && categories.find(c=>c._id === category).subcategory.map(subcat => (
                                        <option value={subcat._id}>{subcat.name}</option>
                                   ))
                                }

                            </select>
                        </div>
                    </div>
                </div>
                <hr />
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
                <hr />
                <div className="row">
                                
                    <div className="row col-md-6 color-picker">
                   <button className="button color-btn" onClick={() => setshowColorPicker(showColorPicker => ! showColorPicker)}>
                       {showColorPicker ? 'Close color picker' : 'Pick a Color'}

                   </button>
                   {showColorPicker && (
                       
                       <ChromePicker 
                            color={colors}
                            onChange={updatedColor => setColors(updatedColor.hex)} />
                            
                   )}
                    

                    <div className="view-color" style={{backgroundColor: colors}}></div>
                    
                    </div>
                    <div className="col-md-6">
                        <TextBox
                            name="product_tags"
                            placeholder="Enter Product tags here"
                            label="Prodcut tags"
                            onTextChange={text => setTags(text)} />
                    </div>
                </div>
                <hr />
                <TextBox
                    name="product_description"
                    placeholder="Enter Product description here"
                    label="Prodcut description"
                    type="textarea"
                    onTextChange={text => setDescription(text)} />
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
