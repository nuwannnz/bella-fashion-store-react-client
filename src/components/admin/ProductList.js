import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProductAsync, productDeletedByIDAsync,productsLoadedAsync } from "../../redux/actions/admin-panel/product.actions";
import { addBrandAsync } from '../../redux/actions/admin-panel/brand.actions';
import { useHistory } from "react-router-dom";
import AdminUpdateProductForm from './forms/AdminUpdateProductForm';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import ViewProduct from './ViewProduct';

export default function ProductList(){

    const dispatch = useDispatch();
    const history = useHistory();

    const products = useSelector(state => state.product.products);

    const[open,setOpen] = useState("");
    const[openView,setOpenView] = useState("");
    const[selectedId, setSelectedId] = useState("");

    const deleteProducts = (pid) => {
      
        confirmAlert({
          title: 'Confirm to Delete the product',
          message: 'Are you sure to do this ?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {dispatch(productDeletedByIDAsync(pid))}
            },
            {
              label: 'No',
              
            }
          ]
        });
      };
  
    
    const onOpenUpdateModal = (id) => {
        setOpen(true);
        setSelectedId(id);
      };

    const onOpenViewModal = (id) => {
      setOpenView(true);
      setSelectedId(id);
    }
     const onCloseUpdateModal = () => {
        setOpen(false);
      };

     const onCloseViewModal = () => {
       setOpenView(false);
     }
    
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
                                <tr key={product._id}>
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
                                   <button className="button buttonView" onClick={() => onOpenViewModal(product._id)}>VIEW</button>
                                   <Modal open={openView} onClose={onCloseViewModal} center>
                                     <div>
                                       <ViewProduct pid = {selectedId}/>
                                     </div>
                                   </Modal>
                                   <button className="button buttonEdit" onClick={() => onOpenUpdateModal(product._id)}>EDIT</button>
                <Modal open={open} onClose={onCloseUpdateModal} center>
                                  
                    <div><AdminUpdateProductForm 
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
                                    pid = {selectedId}


                                    onAddBrandClick = {(bname) => dispatch(addBrandAsync(bname,history)) }/></div>
                                    </Modal>

                                        <button class="button buttonDelete" onClick={() => deleteProducts(product._id)} >Delete</button> 
                                        
                                          
                                    </td>
                               </tr> 
                           ))
                       }
                   </tbody>
               </table>
              
                
            </div>
        )
    
}
