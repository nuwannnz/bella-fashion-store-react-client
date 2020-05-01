import React, { Component } from 'react'
import Title from '../../../components/common/Title'
import NewCategoryAdmin from '../../../components/admin/categories/NewCategoryAdmin'
//import '../styles/categoriesAdmin.css'
import { getAssetUrl } from "../../../helpers/assets.helper";

export default class CategoriesAdmin extends Component {
    render() {
        return (
            <div className="container">
                <div className="page login-page-wrap flex align-center flex-c">
                <div className="logo">
                    <img src={getAssetUrl("logo/logo.png")} alt="Bella logo" />
                </div></div>
                <Title title = "Categories Admin Panel" subtitle="In here you can add a new category to the system or customize the existing categories or delete them" />
                
                <NewCategoryAdmin title="Mens" />
                <NewCategoryAdmin title="Womens" />
            </div>
        )
    }
}
