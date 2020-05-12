import React, { useState }from 'react'
import '../../../styles/product.css'
import AdminAddProductsForm from "../../../components/admin/forms/AdminAddProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync } from "../../../redux/actions/admin-panel/product.actions";
import { getAssetUrl } from "../../../helpers/assets.helper";
import { useHistory } from "react-router-dom";
import ProductList from '../../../components/admin/ProductList';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import '../../../styles/common/AccentButton.css';
import OffersSlider from '../../../components/customer/OffersSlider';
import { addBrandAsync } from '../../../redux/actions/admin-panel/brand.actions';

export default function ProductDashboardPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const errorMsg = useSelector(state => state.staffLogin.ui.errorMsg);
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
                        errorMsg={errorMsg}
                         onAddProductClick={( 
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
                            dispatch(addProductAsync(
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

                                
                            ))}
                            
                            onAddBrandClick = {(bname) => dispatch(addBrandAsync(bname,history)) }/></div>
                    </Modal>
                    <hr />
                    <br />
                <ProductList />
               
                
               
 
            </div>
        )
    
}
