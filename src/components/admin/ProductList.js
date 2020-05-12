import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateProductAsync, productDeletedByIDAsync,productsLoadedAsync } from "../../redux/actions/admin-panel/product.actions";
import { useHistory } from "react-router-dom";
import AdminUpdateProductForm from './forms/AdminUpdateProductForm';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { addBrandAsync } from '../../redux/actions/admin-panel/brand.actions';

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
    
    useEffect(()=>{
        dispatch(productsLoadedAsync())
    },[])
          
       

    
  
  
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
                        <td>Last updated date</td>
                        <td>Action</td>

                     </tr>

                   </thead>
                   <tbody>
                       {
                           products.map(product => (
                                <tr>
                                    <td>{product._id}</td>
                                   <td>{product.name}</td>
                                   <td>
                                   {product.sizeQty && product.sizeQty.map(sizes => (
                                      <p> {sizes.size}</p>
                                   ))}</td>
                                   <td>
                                   {product.sizeQty && product.sizeQty.map(sizes => (
                                        <p>{sizes.qty}</p>
                                    ))}</td>
                                   <td>{product.brand}</td>
                                   <td>{product.category}</td>
                                   <td>{product.subCategory}</td>
                                   <td>{product.price}</td>
                                   <td>{product.discount}</td>
                                   <td>{product.colors}</td>
                                   <td>{product.tags}</td>
                                   <td>{product.description}</td>
                                   <td>{product.addedDate}</td>
                                   <td>{product.updatedDate}</td>
                                   <td>
                                   <button className="button buttonEdit" onClick={onOpenModal}>EDIT</button>
                <Modal open={open} onClose={onCloseModal} center>
                                  
                    <div><AdminUpdateProductForm errorMsg={errorMsg}
                                    onUpdateProductClick={( 
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
                                    ) =>
                                    dispatch(updateProductAsync(
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
                                        description, history
                                    ))
                                
                                }
                                    id = {product._id} 
                                    name= {product.name}
                                    size = {product.sizeQty}
                                    brand = {product.brand}
                                    category = {product.category}
                                    sub_category = {product.subCategory}
                                    price = {product.price}
                                    discount = {product.discount}
                                    colors = {product.colors}
                                    tags = {product.tags}
                                    description = {product.description}


                                    onAddBrandClick = {(bname) => dispatch(addBrandAsync(bname,history)) }/></div>
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
