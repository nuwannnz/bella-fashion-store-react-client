import React, { useState }  from 'react'
import Title from '../../../components/common/Title'
import NewCategoryAdmin from '../../../components/admin/categories/NewCategoryAdmin'
import { Form,Button,Card } from 'react-bootstrap';
import { getAssetUrl } from "../../../helpers/assets.helper";
import {categoriesAsync,addNewCategoryAsync} from '../../../redux/actions/admin-panel/category.actions'
import { useDispatch } from 'react-redux';

export default function CategoriesAdmin()  {

    const dispatch = useDispatch();
    const categories = dispatch(categoriesAsync());

        return (
            <div className="container">
                <div className="page login-page-wrap flex align-center flex-c">
                <div className="logo">
                    <img src={getAssetUrl("logo/logo.png")} alt="Bella logo" />
                </div></div>
                <Title title = "Categories Admin Panel" subtitle="In here you can add a new category to the system or customize the existing categories or delete them" />
                <Card className="text-center">
                <Card.Header><h4>Add New Category</h4></Card.Header>
                <Card.Body>
                <Form>
                <Form.Group>
                <Form.Control type="text" placeholder="Enter New Category" />
                </Form.Group>
                </Form>
                <Button variant="primary" type="submit" >Submit</Button>
                </Card.Body>
                </Card>
                <NewCategoryAdmin title="Mens" />
                <NewCategoryAdmin title="Womens" />
            </div>
        )
    }

