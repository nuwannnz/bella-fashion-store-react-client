import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { deleteBrandByID,brandsLoadedAsync } from "../../redux/actions/admin-panel/brand.actions";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import LoadingScreen from 'react-loading-screen';

export default function BrandList() {

    const dispatch = useDispatch();
    const history = useHistory();

    const brands = useSelector(state => state.brand.brands);
    const loading = useSelector(state => state.brand.loading);

    const[open,setOpen] = useState("");
    const[openView,setOpenView] = useState("");
    const[selectedId, setSelectedId] = useState("");

    
    const deleteProducts = (pid) => {
      
        confirmAlert({
          title: 'Confirm to Delete the brand',
          message: 'Are you sure to do this ?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {dispatch(deleteBrandByID(pid))}
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
                       <td>Brand ID</td>
                       <td>Brand Logo</td>
                        <td>Brand Name</td>
                        <td>Actions</td>

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
                                    <button class="button buttonDelete" onClick={() => deleteProducts(brands._id)} ><i className="fa fa-trash"></i> DELETE</button>     
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
