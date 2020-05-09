import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateProductAsync, productDeletedByIDAsync,productsLoadedAsync } from "../../redux/actions/admin-panel/product.actions";
import { useHistory } from "react-router-dom";
import AdminUpdateProductForm from './forms/AdminUpdateProductForm';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function ProductList(){

    const dispatch = useDispatch();
    const history = useHistory();

    const products = useSelector(state => state.product.products);

    const errorMsg = useSelector(state => state.staffLogin.ui.errorMsg);

    const[open,setOpen] = useState("");
  
    
    const onOpenModal = () => {
        setOpen(true);
      };
     const onCloseModal = () => {
        setOpen(false);
      };
    
    dispatch(productsLoadedAsync())

    
  
  
        return (
            <div class="table-responsive"> 
               <table class="table table-bordered">
                <thead class="thead-light">
                   <tr>
                       <td>Item ID</td>
                        <td>ItemName</td>
                        
                        <td colSpan="2">Sizes and quantites</td>
                        <td>Brand</td>
                        <td>Category</td>
                        <td>Sub category</td>
                        <td>Price</td>
                        <td>Discount</td>
                        <td>Color</td>
                        <td>Tags</td>
                        <td>Description</td>
                        <td>Added date</td>
                        <td>Action</td>

                     </tr>

                   </thead>
                   <tbody>
                       {
                           products.map(product => (
                                <tr>
                                    <td>{product._id}</td>
                                   <td>{product.product_name}</td>
                                   <td>
                                   {product.product_size_qty.map(sizes => (
                                      <p> {sizes.size}</p>
                                   ))}</td>
                                   <td>
                                   {product.product_size_qty.map(sizes => (
                                        <p>{sizes.qty}</p>
                                    ))}</td>
                                   <td>{product.product_brand}</td>
                                   <td>{product.product_category}</td>
                                   <td>{product.product_sub_category}</td>
                                   <td>{product.product_price}</td>
                                   <td>{product.product_discount}</td>
                                   <td>{product.product_colors}</td>
                                   <td>{product.product_tags}</td>
                                   <td>{product.product_description}</td>
                                   <td>{product.product_added_date}</td>
                                   <td>
                                   <button className="button buttonEdit" onClick={onOpenModal}>EDIT</button>
                <Modal open={open} onClose={onCloseModal} center>
                                  
                    <div><AdminUpdateProductForm errorMsg={errorMsg}
                                    onUpdateProductClick={( 
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
                                    ) =>
                                    dispatch(updateProductAsync(
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
                                        product_description, history
                                    ))}
                                    id = {product._id} 
                                    name= {product.product_name}
                                    size = {product.product_size_qty}
                                    brand = {product.product_brand}
                                    category = {product.product_category}
                                    sub_category = {product.product_sub_category}
                                    price = {product.product_price}
                                    discount = {product.product_discount}
                                    colors = {product.product_colors}
                                    tags = {product.product_tags}
                                    description = {product.product_description}


                                     /></div>
                                    </Modal>

                                        <button class="button buttonDelete" onClick={() => {dispatch(productDeletedByIDAsync(product._id))}} >Delete</button>   
                                    </td>
                               </tr> 
                           ))
                       }
                   </tbody>
               </table>
              
                
            </div>
        )
    
}
