import React from 'react'
import CategoriesContainer from '../../../components/customer/CategoriesContainer'
import Hero from '../../../components/common/Hero'
import '../../../styles/categoryList.css'

export default function CustomerCategoryPage() {
    return (
        <div>
            <Hero hero="dressesHero"/>
            <CategoriesContainer/>

        </div>
    )
}
