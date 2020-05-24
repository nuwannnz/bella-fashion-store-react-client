import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { deleteBrandByID,brandsLoadedAsync } from "../../redux/actions/admin-panel/brand.actions";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import LoadingScreen from 'react-loading-screen';

export default function BrandList() {

    const dispatch = useDispatch();
  
    //from redux state
    const brands = useSelector(state => state.brand.brands);
    const loading = useSelector(state => state.brand.loading);

    //delete products with confirm alert
    const deleteBrands = (bid) => {
      
        confirmAlert({
          title: 'Confirm to Delete the brand',
          message: 'Are you sure to do this ?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {dispatch(deleteBrandByID(bid))}
            },
            {
              label: 'No',
              
            }
          ]
        });
      };
  
    
    useEffect(()=>{
        dispatch(brandsLoadedAsync())
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
                       <td><b>Brand ID</b></td>
                       <td><b>Brand Logo</b></td>
                        <td><b>Brand Name</b></td>
                        <td><b>Actions</b></td>

                     </tr>

                   </thead>
                   <tbody>
                       {
                           brands.map(brands => (
                                <tr key={brands._id}>
                                    <td>{brands._id}</td>
                                    <td><img className="viewimg" src={brands.images} /></td>
                                   <td>{brands.name}</td>
                               
                                   <td>
                                    <button class="button buttonDelete" onClick={() => deleteBrands(brands._id)} ><i className="fa fa-trash"></i></button>     
                                    </td>
                               </tr> 
                           ))
                       }
                   </tbody>
               </table>
              
                
            </div>
            </LoadingScreen>
        )
    
}
