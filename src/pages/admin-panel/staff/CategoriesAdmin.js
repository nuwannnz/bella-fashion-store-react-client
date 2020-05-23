import React, { useState, useEffect}  from 'react'
import Title from '../../../components/common/Title'
import NewCategoryAdmin from '../../../components/admin/categories/NewCategoryAdmin'
import { Form,Button,Card } from 'react-bootstrap';
import {categoriesAsync,addNewCategoryAsync} from '../../../redux/actions/admin-panel/category.actions'
import { useDispatch, useSelector } from 'react-redux';
import TextBox from '../../../components/common/TextBox';
import { isEmpty } from "../../../helpers/input-validation.helper";
import Swal from 'sweetalert2'


export  function CategoriesAdmin()  {

const dispatch = useDispatch();
const categories = useSelector(state => state.category.categories )

const [category, setCategory] = useState([]) 
const [categoryName, setCategoryName] = useState("");

useEffect(()=>{
    dispatch(categoriesAsync());

}, [])
// if (categories) {
//     setMenuItems(categories);
//   }


// console.log(category);

const submitForm = () => {


    if (isEmpty(categoryName)) {
        Swal.fire({
            title: 'Error!',
            text: 'Please add a Category Name',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    } else {
        dispatch(addNewCategoryAsync(categoryName));
        Swal.fire({
            title: 'Success!',
            text: 'You have Successfully added a new Category ',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
    }
  }

        return (

            <div className="content-wrapper">

                <Title title = "Categories Admin Panel" subtitle="In here you can add a new category to the system or customize the existing categories or delete them" />
                <div className="card border-secondary mb-3 ">
                <div class="card-header"><h4>Add New Category</h4></div>
                <Card.Body>
                <Form>
                <Form.Group>
                <TextBox
                    onTextChange={text => setCategoryName(text)}
                    placeholder="Enter Category Name here"
                    name="CategoryName"
                    label="CategoryName"
                />
                </Form.Group>
                </Form>
                <Button variant="success" id="add-category-btn" type="submit" onClick={submitForm} >Submit</Button>
                </Card.Body>
                </div>
                {categories.map(category => 
                <NewCategoryAdmin category={category} />
                    )}
            </div>
        )
    }

