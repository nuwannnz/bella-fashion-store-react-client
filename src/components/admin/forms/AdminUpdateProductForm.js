import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from "../../common/ErrorMessage";
import { isEmpty } from "../../../helpers/input-validation.helper";
import TextBox from '../../common/TextBox';
import AccentButton from '../../common/AccentButton';
import { brandsLoadedAsync } from '../../../redux/actions/admin-panel/brand.actions';
import { categoriesAsync } from '../../../redux/actions/admin-panel/category.actions'
import { clearProductsUpdatedSuccessMsg } from '../../../redux/actions/admin-panel/product.actions';
import SuccessMessage from '../../common/SuccessMessage';
import { ChromePicker } from 'react-color'
import '../../../styles/common/SelectBox.css'

import '../../../styles/common/IconButton.css'


export default function AdminUpdateProductForm({onUpdateProductClick, onAddBrandClick,pid}) {

    const dispatch = useDispatch();
    const brands = useSelector(state => state.brand.brands);
    const categories = useSelector(state => state.category.categories );
    const products = useSelector(state => state.product.products);
    const errorMsg = useSelector(state => state.product.errorMsg);
    const successMsg = useSelector(state => state.product.successMsg)

    const [addSizes, setAddSizes] = useState([])
    const [sizeQty, setSizeQty] = useState([])

    const [_id, setId] = useState("");
    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const [qty, setQty] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [colors, setColors] = useState("");
    const [tags, setTags] = useState("");
    const [description, setDescription] = useState("");
    const [subSelectedCategories, setSubCategories] = useState([{_id:'', subcategory:[{_id:'', name:''}], name: ''}]);

    const [bname, setBrandname] = useState("");

    const [selectedProduct, setSelectedProduct] = useState(null);

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

        
    const removeData = (index) => {
        console.log(index)
        const newArray = sizeQty

        if(index != -1) {
            newArray.splice(index, 1);
            setSizeQty([...newArray]);
        }

    }
        
    useEffect(()=>{
		console.log(pid)
		const id = pid;
		const _selectedProduct = products.find(p => p._id === id);
        setSelectedProduct(_selectedProduct);
        console.log(pid)
        
       
    }, [pid])


    useEffect(()=>{
        if(selectedProduct){

            const sizeInf = selectedProduct.sizeQty.map(sq => ({size: sq.size, qty: sq.qty}));
            setSizeQty(sizeInf)
        }
    },[selectedProduct])

  
   
    console.log(selectedProduct)
     const submitBrand =() => {
        if(isEmpty(bname)) {
            setInvalidInput("brand name is required");
        } else {
            setInvalidInput("");
            onAddBrandClick(bname);
        }

        
    }
    useEffect(() => {
        dispatch(brandsLoadedAsync());
        dispatch(clearProductsUpdatedSuccessMsg());
        return () => {
            
        }
    },[])
    
    
    useEffect(() => {
        dispatch(categoriesAsync())
    }, [])

   

    const [invalidInput, setInvalidInput] = useState("");
    const [validInput, setValidInput] = useState("");

    const submitForm = () => {

        if (isEmpty(name)) {
            setInvalidInput("product name is required");
            setValidInput("");
        } else if (isEmpty(sizeQty)) {
            setInvalidInput("product qty and sizes are required");
            setValidInput("");
        
        }else if (isEmpty(brand)) {
            setInvalidInput("product brand is required");
            setValidInput("");

        } else if (isEmpty(category)) {
            setInvalidInput("product category is required");
            setValidInput("");

        }else if (isEmpty(subCategory)) {
            setInvalidInput("product category is required");
            setValidInput("");

        } else if (isEmpty(price)) {
            setInvalidInput("product price is required");
            setValidInput("");

        } else if (isEmpty(discount)) {
            setInvalidInput("product discount is required");
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
            setInvalidInput("");
            onUpdateProductClick(
                _id,
                name,
                sizeQty,
                brand,
                category,
                subCategory,
                price,
                discount,
                colors,
                tags,
                description
                
            );
            setValidInput(successMsg);
        }


    }
   
        return (
            <div className="model-style">

         <div className="containerForm">
         <TextBox 
             name="product_id"
             placeholder="Enter Product id here"
             label="Prodcut id"
             
             onTextChange={text => setId(text)} />
            
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

                        <div className="select-box">
                            <select onChange={e => { setSize(e.target.value); console.log(e.target.value) }}>
                                <option className="default-option" value="-1">- pick a size -</option>
                                <option className="Licc">Licc</option>
                                {addSizes.map(sizes => (
                                    <option value={sizes}>{sizes}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                 
                    <div className="col-md-5">
                        <TextBox 
                        name="product_qty"
                        placeholder="You can enter quatity here"
                        label="Product quantity"
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
                <div className="row">
                <div className="col-md-6">  
                    <label>Brands :</label>

                        <div className="select">

                        <select id="leave" onChange={e => {setBrand(e.target.value); console.log(e.target.value)}}>
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
                    <div className="col-md-3">
                    <button class="iconBtn" onClick={submitBrand}><i class="fa fa-plus"></i></button>
                    </div>
                    </div>
                </div>
                
            </div>
            <div className="row">
                <div className="col-md-6"> 
                    <label>Category</label>

                    <div className="select-box">

                    <select id="leave" onChange={e => {setCategory(e.target.value); console.log(e.target.value)}}>
                        <option className="default-option" value="-1">- pick a category -</option>
                        {/* {categories && categories.map( category => (
                                    <option value={category._id}>{category.name}</option>
                                ))} */}
                    
                    </select>
                    </div>

            </div>
                <div className="col-md-6"> 
                    <label>Sub-Category</label>
                    <div className="select-box">
                    <select id="leave" onChange={e => {setSubCategory(e.target.value); console.log(e.target.value)}}>
                    <option className="default-option"  value="-1">- pick a sub category -</option>
                        {/* {
                                  categories &&  category !== '-1' && categories.find(c=>c._id === category).subcategory.map(subcat => (
                                        <option value={subcat._id}>{subcat.name}</option>
                                   ))
                                } */}
\
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

{
                invalidInput !== null && invalidInput.length > 0 ?
                    <ErrorMessage msg={invalidInput} />
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
            }


            <AccentButton onButtonClick={submitForm} text="UPDATE" />
           
           

                
            </div>
          
            </div>
                
        )
    
}
