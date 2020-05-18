import React, { useState } from 'react'
import '../../../styles/categoryAdmin.css'
import { FaRegEdit } from 'react-icons/fa';
import {FaTrashAlt} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import TextBox from '../../common/TextBox';
import { Form,Button,ButtonGroup,Table,Modal } from 'react-bootstrap';
import {addNewSubCategoryAsync,updateCategoryAsync,deleteCategoryAsync,updateSubCategoryAsync,deleteSubCategoryAsync} from '../../../redux/actions/admin-panel/category.actions'
import Swal from 'sweetalert2'

import { isEmpty } from "../../../helpers/input-validation.helper";
import { updateSubCategory } from '../../../services/admin/category.service';

export default function NewCategoryAdmin({category}) {

    const dispatch = useDispatch();
    const [show,setShow] = useState(false) 
    const [update,setUpdate] = useState(false) 
    const [subCatupdate,setSubCatUpdate] = useState(false) 
    const [subCatIdToUpdate,setSubCatIdToUpdate] = useState(-1) 
    const [categoryName, setCategoryName] = useState(category.name);
    const [SubCategoryName, setSubCategoryName] = useState("");
    const [NewSubCategoryName, setNewSubCategoryName] = useState("");
    const categoryID = category._id;

    const UpdateCategoryForm = () => {
        if (isEmpty(categoryID)) {
            Swal.fire({
                title: 'Error!',
                text: 'Category ID is Empty',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        }else if (isEmpty(categoryName)) {
            Swal.fire({
                title: 'Error!',
                text: 'Please add a Category Name',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        } else {
            dispatch(updateCategoryAsync(categoryID,categoryName));
            Swal.fire({
                title: 'Success!',
                text: 'You have Successfully Updated ' +categoryName,
                icon: 'success',
                confirmButtonText: 'Ok'
              })
            setUpdate(false)
        }
      }

    const updateSubCategoryForm = () => {
      if (isEmpty(NewSubCategoryName)) {
        Swal.fire({
            title: 'Error!',
            text: 'Please add a Category Name',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    } else {
        dispatch(updateSubCategoryAsync(categoryID,subCatIdToUpdate, NewSubCategoryName));
        Swal.fire({
            title: 'Success!',
            text: 'You have Successfully Updated ' +subCatIdToUpdate,
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          setSubCatUpdate(false)
    }
  }

    const deleteCategory = () => {
        if (isEmpty(categoryID)) {
            Swal.fire({
                title: 'Error!',
                text: 'CategoryID is Empty',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        } else {
            dispatch(deleteCategoryAsync(categoryID));
            Swal.fire({
                title: 'Success!',
                text: 'Deleted Successfully '+categoryID,
                icon: 'warning',
                confirmButtonText: 'Ok'
              })
        }
    }

    const deleteSubCategory = (subcategoryID) => {
      if (isEmpty(subcategoryID)) {
          Swal.fire({
              title: 'Error!',
              text: 'CategoryID is Empty',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
      } else {
          dispatch(deleteSubCategoryAsync(categoryID,subcategoryID));
          Swal.fire({
              title: 'Success!',
              text: 'Deleted Successfully '+subcategoryID,
              icon: 'warning',
              confirmButtonText: 'Ok'
            })
      }
  }

      const addNewSubCategory = () => {

        if (isEmpty(categoryName)) {
            Swal.fire({
                title: 'Error!',
                text: 'Category Name is Empty',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        }else if (isEmpty(SubCategoryName)) {
            Swal.fire({
                title: 'Error!',
                text: 'Please add a Sub-Category Name',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        } else {
            dispatch(addNewSubCategoryAsync(categoryName,SubCategoryName));
            Swal.fire({
                title: 'Success!',
                text: 'Successfully Added '+SubCategoryName,
                icon: 'success',
                confirmButtonText: 'Ok'
              })
              setShow(false);
        }
      }

    return (
        
        <div class="container" id="category-heading">
        <h1>{category.name}
        <Button variant="outline-secondary" id="edit-btn" onClick={() => setUpdate(true)}  class="btn btn-outline-warning" type="submit">Edit</Button>
        <Button variant="outline-danger"  class="btn btn-outline-danger" type="submit" onClick={deleteCategory} >Delete</Button>
        </h1><hr/>
       
     
            <Table striped bordered hover >
            <thead className="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Category</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    category.subcategory.map(subCat =>(
                <tr>
                <td>{subCat._id}</td>
                <td>{subCat.name}</td>
                <td><Button variant="warning" onClick={() => {setSubCatIdToUpdate(subCat._id);setSubCatUpdate(true);}} className="btn-edit" type="submit"><FaRegEdit/></Button></td>
                <td> <Button variant="danger" className="btn-delete" type="submit" onClick={() => deleteSubCategory(subCat._id)}><FaTrashAlt/></Button></td> 
                </tr>
                ))}
                </tbody>
            </Table>

   

        <Button  variant="success"onClick={() => setShow(true)}>
          Add New Sub-Category
        </Button>

        <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header>
                <Modal.Title>New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <Form.Group>
                <TextBox
                    onTextChange={text => setSubCategoryName(text)}
                    placeholder="Enter Sub-Category Name here"
                    name="SubCategoryName"
                    label="Sub-Category Name"
                />
                </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={addNewSubCategory} type="submit">Submit</Button>
                <Button variant="danger" onClick={() => setShow(false)}>Close</Button>
                </Modal.Footer>
          </Modal>

          <Modal show={update} onHide={() => setUpdate(false)}>
                <Modal.Header>
                <Modal.Title>Update Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <Form.Group >
                <TextBox
                    onTextChange={text => setCategoryName(text)}
                    placeholder="Update Category Name"
                    name="categoryName"
                    label="Category Name"
                />
                </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" type="submit" onClick={UpdateCategoryForm}>Submit</Button>
                <Button variant="danger" onClick={() => setUpdate(false)}>Close</Button>
                </Modal.Footer>
          </Modal>

          <Modal show={subCatupdate} onHide={() => setSubCatUpdate(false)}>
                <Modal.Header>
                <Modal.Title>Update Sub-Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <TextBox
                    onTextChange={text => setNewSubCategoryName(text)}
                    placeholder="Update Sub-Category Name"
                    name="NewSubCategoryName"
                    label="Sub-Category Name"
                />
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" type="submit" onClick={updateSubCategoryForm}>Submit </Button>
                <Button variant="danger" onClick={() => setSubCatUpdate(false)}>Close</Button>
                </Modal.Footer>
          </Modal>

            <div className="static-modal">
            
            </div>
            
            </div> 

    )
}

