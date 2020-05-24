import React, { useState } from 'react'
import '../../../styles/product.css'
import AdminAddBrandsForm from "../../../components/admin/forms/AdminBrandsForm";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync } from "../../../redux/actions/admin-panel/product.actions";
import { useHistory } from "react-router-dom";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import '../../../styles/common/AccentButton.css';
import { addSizeAsync } from '../../../redux/actions/admin-panel/size.actions';
import BrandList from '../../../components/admin/BrandList';
import SizeList from '../../../components/admin/SizeList';
import AdminAddSizesForm from '../../../components/admin/forms/AdminAddSizesForm';

export default function AdminSizesPage() {

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
                <button className="button buttonAdd" onClick={onOpenModal}><i className="fa fa-plus-circle"></i> ADD NEW SIZE TO THE SYSTEM</button>
                <Modal open={open} onClose={onCloseModal} center>
                    <div><AdminAddSizesForm
                          onAddSizeClick = {(sizeData) => dispatch(addSizeAsync(sizeData,history)).then(success => {
                            if(success) {
                                setOpen(false);
                            }
                        })}/></div>
                    </Modal>
                    <hr />
                    <br />
                <SizeList /> 
            </div>
        )
    
}
