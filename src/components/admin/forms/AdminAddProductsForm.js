import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from "../../common/ErrorMessage";
import { isEmpty } from "../../../helpers/input-validation.helper";
import TextBox from '../../common/TextBox';
import AccentButton from '../../common/AccentButton';
import { brandsLoadedAsync } from '../../../redux/actions/admin-panel/brand.actions';
import '../../../styles/common/IconButton.css'


export default function AdminAddProductsForm({onAddProductClick,onAddBrandClick, errorMsg = ""}) {

    const dispatch = useDispatch();
    const brands = useSelector(state => state.brand.brands);
   
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

    const [bname, setBrandname] = useState("");

    const sizeQty = [
       {size: "S", qty: qty_small},
        {size: "M", qty: qty_medium},
        {size: "L", qty: qty_large}
    ];



    const [invalidInput, setInvalidInput] = useState("");

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
        return () => {
            
        }
    },[])
    



    const submitForm = () => {

        if (isEmpty(name)) {
            setInvalidInput("product name is required");

        } else if (isEmpty(sizeQty)) {
            setInvalidInput("product sizes and qtys is required");
    

        }else if (isEmpty(brand)) {
            setInvalidInput("product brand is required");

        } else if (isEmpty(category)) {
            setInvalidInput("product category is required");

        }else if (isEmpty(subCategory)) {
            setInvalidInput("product category is required");

        } else if (isEmpty(price)) {
            setInvalidInput("product price is required");

        }else if (price < 0) {
            setInvalidInput("product price shouldn't be less than 0");

        }  else if (isEmpty(discount)) {
            setInvalidInput("product discount is required");

        } else if (discount < 0) {
            setInvalidInput("product discount shouldn't be less than 0");

        } else if (isEmpty(colors)) {
            setInvalidInput("product colors is required");

        } else if (isEmpty(tags)) {
            setInvalidInput("product tags is required");

        } else if (isEmpty(description)) {
            setInvalidInput("product description is required");

        }
         else {
           
            setInvalidInput("");
            onAddProductClick(
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

                    <div className="select">

                    <select id="leave" onChange={e => {setCategory(e.target.value); console.log(e.target.value)}}>
                        <option value="Mens">Mens</option>
                        <option value="Womens">Womens</option>
                    
                    </select>
                    </div>

            </div>
                <div className="col-md-6"> 
                    <label>Sub-Category</label>
                    <div className="select">
                    <select id="leave" onChange={e => {setSubCategory(e.target.value); console.log(e.target.value)}}>
                        <option value="Shirts">Shirts</option>
                        <option value="Trousers">Trousers</option>
                        <option value="Blousers">Blousers</option>
                        <option value="Frocks">Frocks</option>
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
                    pattern = "^\$\d{1,3}(,\d{3})*(\.\d+)?$"
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


            {errorMsg.length > 0 ?
                <ErrorMessage msg={errorMsg} />
                : null
            }


            <AccentButton onButtonClick={submitForm} text="ADD" />
           
           

                
            </div>
            </div>
                
        )
    
}
