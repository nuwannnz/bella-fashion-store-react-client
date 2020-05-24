import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { deleteSizeByID, sizesLoadedAsync } from "../../redux/actions/admin-panel/size.actions";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import LoadingScreen from 'react-loading-screen';


export default function SizeList() {

    const dispatch = useDispatch();

    //from redux state
    const sizes = useSelector(state => state.size.sizes);
    const loading = useSelector(state => state.size.loading);


    useEffect(()=>{
      dispatch(sizesLoadedAsync())
  },[])

    //delete sizes with confirm alert
    const deleteSizes = (sid) => {
      
        confirmAlert({
          title: 'Confirm to Delete the brand',
          message: 'Are you sure to do this ?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {dispatch(deleteSizeByID(sid))}
            },
            {
              label: 'No',
              
            }
          ]
        });
      };

   
    
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
                    <td><b>Size ID</b></td>
                    <td><b>Size Name</b></td>
                     <td><b>Size Description</b></td>
                     <td><b>Actions</b></td>

                  </tr>

                </thead>
                <tbody>
                    {
                       sizes.map(sizes => (
                             <tr key={sizes._id}>
                                 <td>{sizes._id}</td>
                                 <td>{sizes.name}</td>
                                <td>{sizes.description}</td>
                            
                                <td>
                                 <button class="button buttonDelete" onClick={() => deleteSizes(sizes._id)} ><i className="fa fa-trash"></i></button>     
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
