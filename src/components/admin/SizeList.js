import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { deleteSizeByID, sizesLoadedAsync } from "../../redux/actions/admin-panel/size.actions";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function SizeList() {



    const dispatch = useDispatch();
    const history = useHistory();

    const sizes = useSelector(state => state.size.sizes);

    const[open,setOpen] = useState("");
    const[openView,setOpenView] = useState("");
    const[selectedId, setSelectedId] = useState("");

    useEffect(()=>{
      dispatch(sizesLoadedAsync())
      console.log(sizes)
  },[])
    const deleteSizes = (pid) => {
      
        confirmAlert({
          title: 'Confirm to Delete the brand',
          message: 'Are you sure to do this ?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {dispatch(deleteSizeByID(pid))}
            },
            {
              label: 'No',
              
            }
          ]
        });
      };

   
    
        return (
            
                <div class="table-responsive"> 
                    <table class="table table-bordered">
                    <thead class="thead-light">
                <tr>
                    <td>Size ID</td>
                    <td>Size Name</td>
                     <td>Size Description</td>
                     <td>Actions</td>

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
                                 <button class="button buttonDelete" onClick={() => deleteSizes(sizes._id)} ><i className="fa fa-trash"></i> DELETE</button>     
                                 </td>
                            </tr> 
                        ))
                    }
                </tbody>
            </table>
           
             
         </div>
            
            
        )
    
}
