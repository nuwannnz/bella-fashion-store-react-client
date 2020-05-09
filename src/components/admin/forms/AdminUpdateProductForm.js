import React, { useState, useEffect } from 'react'
import ErrorMessage from "../../common/ErrorMessage";
import { isEmpty } from "../../../helpers/input-validation.helper";
import TextBox from '../../common/TextBox';
import AccentButton from '../../common/AccentButton';


export default function AdminUpdateProductForm({onUpdateProductClick, errorMsg = "" ,id,name,qty,size,brand,category,sub_category,price,discount,colors,tags,description}) {

    const [_id, setId] = useState("");
    const [product_name, setName] = useState("");
    const [product_qty_small, setQtyS] = useState("");
    const [product_qty_medium, setQtyM] = useState("");
    const [product_qty_large, setQtyL] = useState("");
    const [product_brand, setBrand] = useState("");
    const [product_category, setCategory] = useState("");
    const [product_sub_category, setSubCategory] = useState("");
    const [product_price, setPrice] = useState("");
    const [product_discount, setDiscount] = useState("");
    const [product_colors, setColors] = useState("");
    const [product_tags, setTags] = useState("");
    const [product_description, setDescription] = useState("");

    const product_size_qty = [
        {size: "S", qty: product_qty_small},
         {size: "M", qty: product_qty_medium},
         {size: "L", qty: product_qty_large}
     ];
  
   
    const setdefaultValue = () => {
        setId(id)
        setName(name)
        setBrand(brand)
        setCategory(category)
        setSubCategory(sub_category)
        setPrice(price)
        setDiscount(discount)
        setColors(colors)
        setTags(tags)
        setDescription(description)
        console.log("ran")


    }

useEffect(() => {
    setdefaultValue()
    return () => {
        
    }
}, [])
    
   

    const [invalidInput, setInvalidInput] = useState("");

    const submitForm = () => {

        if (isEmpty(product_name)) {
            setInvalidInput("product name is required");
        } else if (isEmpty(product_size_qty)) {
            setInvalidInput("product qty and sizes are required");
        
        }else if (isEmpty(product_brand)) {
            setInvalidInput("product brand is required");

        } else if (isEmpty(product_category)) {
            setInvalidInput("product category is required");

        }else if (isEmpty(product_sub_category)) {
            setInvalidInput("product category is required");

        } else if (isEmpty(product_price)) {
            setInvalidInput("product price is required");

        } else if (isEmpty(product_discount)) {
            setInvalidInput("product discount is required");

        } else if (isEmpty(product_colors)) {
            setInvalidInput("product colors is required");

        } else if (isEmpty(product_tags)) {
            setInvalidInput("product tags is required");

        } else if (isEmpty(product_description)) {
            setInvalidInput("product description is required");

        }
         else {
            setInvalidInput("");
            onUpdateProductClick(
                _id,
                product_name,
                product_size_qty,
                product_brand,
                product_category,
                product_sub_category,
                product_price,
                product_discount,
                product_colors,
                product_tags,
                product_description
                
            );
        }


    }
   
        return (
            <div>

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
                <div className="col-md-12">  
                    <TextBox 
                    name="product_brand"
                    placeholder="Enter Product brand here"
                    label="Prodcut brand"
                    onTextChange={text => setBrand(text)} />
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


            <AccentButton onButtonClick={submitForm} text="UPDATE" />
           
           

                
            </div>
            </div>
                
        )
    
}
