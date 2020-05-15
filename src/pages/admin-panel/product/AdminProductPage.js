import React, { useState } from 'react'
import '../../../styles/product.css'
import AdminAddProductsForm from "../../../components/admin/forms/AdminAddProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync } from "../../../redux/actions/admin-panel/product.actions";
import { useHistory } from "react-router-dom";
import ProductList from '../../../components/admin/ProductList';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import '../../../styles/common/AccentButton.css';
import { addBrandAsync } from '../../../redux/actions/admin-panel/brand.actions';

export default function ProductDashboardPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    
    const isLoading = useSelector(state => state.staffLogin.ui.isLoading);



    const[open,setOpen] = useState("");
  
    
    const onOpenModal = () => {
        setOpen(true);
    };
    const onCloseModal = () => {
        setOpen(false);
      };
   


    
        return (
            <div className="container-fluid">
                <h1>Admin-Product Page</h1>
                <hr />
                <button className="button buttonAdd" onClick={onOpenModal}>ADD NEW PRODUCT TO THE SYSTEM</button>
                <Modal open={open} onClose={onCloseModal} center>
                    <div><AdminAddProductsForm
                        
                         onAddProductClick={( 
                          productData
                        ) =>
                            dispatch(addProductAsync(
                              productData, history

                                
                            ))}
                            
                            onAddBrandClick = {(bname) => dispatch(addBrandAsync(bname,history)) }/></div>
                    </Modal>
                    <hr />
                    <br />
                <ProductList />
               
                
               
 
            </div>
        )
    
}
