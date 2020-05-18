import React, { useState } from 'react'
import '../../../styles/product.css'
import AdminAddBrandsForm from "../../../components/admin/forms/AdminBrandsForm";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync } from "../../../redux/actions/admin-panel/product.actions";
import { useHistory } from "react-router-dom";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import '../../../styles/common/AccentButton.css';
import { addBrandAsync } from '../../../redux/actions/admin-panel/brand.actions';
import BrandList from '../../../components/admin/BrandList';

export default function AdminProductPage() {

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
                <button className="button buttonAdd" onClick={onOpenModal}><i className="fa fa-plus-circle"></i> ADD NEW BRAND TO THE SYSTEM</button>
                <Modal open={open} onClose={onCloseModal} center>
                    <div><AdminAddBrandsForm
                          onAddBrandClick = {(productData) => dispatch(addBrandAsync(productData,history)) }/></div>
                    </Modal>
                    <hr />
                    <br />
                <BrandList />
            </div>
        )
    
}
