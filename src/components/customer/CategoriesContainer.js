import React from 'react'
//import CategoriesFilter from '../components/categoriesFilter'
import CategoriesList from './CategoriesList'
import img1 from "../../images/70876072_10158392757133514_321574457833422848_o.jpg"
import img2 from "../../images/71921107_10158418719903514_2249016803726458880_o.jpg"
import img3 from "../../images/79171375_10158617272863514_2786360724769734656_n.jpg"
import img4 from "../../images/84177803_10158782517143514_6653581073731026944_o.jpg"
import img5 from "../../images/71656485_10158418713133514_630939534825095168_o.jpg"
import img6 from "../../images/71764177_10158418712298514_7943214226342936576_o.jpg"


export default function CategoriesContainer() {
    return (
        <>
            <div className="category-container">
                <CategoriesList image= {img2} name="Frock2" price="Rs.2500"/>
                <CategoriesList image= {img3} name="Frock3" price="Rs.2000"/>
                <CategoriesList image= {img4} name="Frock4" price="Rs.1500"/>
                <CategoriesList image= {img1} name="Frock1" price="Rs.2500"/>
                <CategoriesList image= {img5} name="Frock5" price="Rs.2000"/>
                <CategoriesList image= {img6} name="Frock6" price="Rs.1500"/>
                <CategoriesList image= {img2} name="Frock2" price="Rs.2500"/>
                <CategoriesList image= {img3} name="Frock3" price="Rs.2000"/>
                <CategoriesList image= {img4} name="Frock4" price="Rs.1500"/>
                <CategoriesList image= {img1} name="Frock1" price="Rs.2500"/>
                <CategoriesList image= {img5} name="Frock5" price="Rs.2000"/>
                <CategoriesList image= {img6} name="Frock6" price="Rs.1500"/>
            </div>

        </>
    );
}
