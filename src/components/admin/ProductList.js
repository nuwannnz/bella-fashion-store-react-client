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
import LoadingScreen from 'react-loading-screen';

export default function ProductList(){

    const dispatch = useDispatch();
    const history = useHistory();

    const products = useSelector(state => state.product.products);
    const loading = useSelector(state => state.product.loading);


    const[open,setOpen] = useState("");
    const[openView,setOpenView] = useState("");
    const[selectedId, setSelectedId] = useState("");
    const[selectedProdcut, setSelectedProduct] = useState(null);

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
      setSelectedId(id)
      setSelectedProduct(products.find(p => p._id === id));
        setOpen(true);
      };

    const onOpenViewModal = (id) => {
      setSelectedId(id)
      setSelectedProduct(products.find(p => p._id === id));
      setOpenView(true);
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
          <LoadingScreen
          loading={loading}
          bgColor='#f1f1f1'
          spinnerColor='#8c52ff'
          textColor='#8c52ff'
          
          text='Loading.. Please wait'
      > 
            <div class="table-responsive"> 
               <table class="table table-bordered">
                <thead class="thead-light">
                   <tr>
                       <td>Item ID</td>
                        <td>ItemName</td>
                        
                        <td colSpan="2">Sizes and quantites</td>
                     
                        <td>Actions</td>

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
                               
                                   <td>
                                   <button className="button buttonView" onClick={() => onOpenViewModal(product._id)}><i className="fa fa-eye"></i></button>
                                   
                                   <button className="button buttonEdit" onClick={() => onOpenUpdateModal(product._id)}><i className="fa fa-pencil"></i></button>
                             

                                        <button class="button buttonDelete" onClick={() => deleteProducts(product._id)} ><i className="fa fa-trash"></i></button> 
                                        
                                          
                                    </td>
                               </tr> 
                           ))
                       }
                      
                   </tbody>
                  
               </table>
              
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
                                )).then(success => { 
                                  if(success){
                                    setOpen(false)
                                  }})
                            
                            }
                                pid = {selectedId}
                                model = {selectedProdcut}


                                onAddBrandClick = {(bname) => dispatch(addBrandAsync(bname,history)) }/></div>
                                </Modal>
                                <Modal open={openView} onClose={onCloseViewModal} center>
                                     <div>
                                       <ViewProduct pid = {selectedId}/>
                                     </div>
                                   </Modal>
            </div>
            </LoadingScreen>
        )
    
}
