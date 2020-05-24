import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { productsLoadedAsync } from "../../redux/actions/customer/product.actions";
import '../../styles/ProductListPage.css'
import { Link, useParams, useHistory } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constants';
import AddToCartButton from '../../components/customer/AddToCartButton';
import AddToWishlistButton from '../../components/customer/AddToWishlistButton';
import { normalizeString } from '../../helpers/input-validation.helper';
import ProductFilterBar, { SORT_TYPE } from '../../components/customer/ProductFilterBar';



export const ProductInfoCard = ({ product }) => {

    const seeOffers = (offer) => {
        if (offer > 0) {
            return true;
        } else return false;
    };

    const totalPrice = () => {
        return product.price - product.discount;
    };


    return (
        <div className="product-info-card">
            <AddToWishlistButton productId={product._id} />
            <div className="add-to-cart-btn-wrap">

                {/* IMPORTANT TODO: 
                    In here the size and qty is only given for testing, remove them in production   
                    */}
                <AddToCartButton productId={product._id} expandedMode={false} />

            </div>


            <Link to={`${ROUTE_PATHS.CUSTOMER_PRODUCT}/${product._id}`} className="product-card-link">
                <div className="product-image-wrapper">
                    <img src={product.images[0]} alt={product.name} />
                </div>

                <div className="product-info-wrapper">
                    <span className="product-name">{product.name}</span>
                    {seeOffers(product.discount) ? <span className="product-price" ><s>LKR {product.price}</s></span> : <span className="product-price" >LKR {product.price}</span>}
                    {seeOffers(product.discount) ? <span className="prdouct-discount" >NOW! LKR {totalPrice()}</span> : ""}

                </div>
            </Link>
        </div>
    )
}


export default function ProductListPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const products = useSelector(state => state.product.products);
    const categories = useSelector(state => state.category.categories)
    const { categoryName, subCategoryName } = useParams();

    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [filter, setFilter] = useState({
        size: [],
        color: [],
        brand: [],
        sort: null
    })

    useEffect(() => {
        if (categories.length === 0) {
            return;
        }
        const category = categories.find(cat => {
            let normalizedC = normalizeString(cat.name);
            return normalizedC === categoryName
        })

        if (!category) {
            // navigate to homepage
            history.push(ROUTE_PATHS.CUSTOMER_SHELL);
            return;
        }

        setCategoryId(category._id)
        if (subCategoryName) {
            let _subCategoryId = category.subcategory.find(sCat => normalizeString(sCat.name) === subCategoryName);
            setSubCategoryId(_subCategoryId._id);
        }
        console.log('setting categories')
    }, [categories, categoryName, subCategoryName, history])

    const handleFilterChanged = useCallback((newFilter) => {
        console.log('setting new filter', newFilter);
        setFilter({ ...newFilter });
    }, [])

    const filterProductForCategory = (product) => {
        if (subCategoryName) {
            if (product.category === categoryId && product.subCategory === subCategoryId) {
                return true;
            }
        } else {
            if (product.category === categoryId) {
                return true;
            }

        }
        return false;
    }

    const filterProductByColor = (product) => {
        if (filter.color.length === 0) {
            return true;
        }
        return filter.color.includes(product.colors)
    }

    const filterProductBySize = (product) => {
        console.log('size filter', filter.size);
        if (filter.size.length === 0) {
            return true;
        }
        return product.sizeQty.map(s => s.size).some(s => filter.size.includes(s));
    }

    const filterProductByBrand = (product) => {
        if (filter.brand.length === 0) {
            return true;
        }
        return filter.brand.includes(product.brand);
    }

    const sortProducts = (products) => {
        if (!filter.sort) {
            return products;
        }

        if (filter.sort === SORT_TYPE.PRICE_HIGH_TO_LOW) {
            return products.sort((a, b) => b.price - a.price)
        } else if (filter.sort === SORT_TYPE.PRICE_LOW_TO_HIGH) {
            return products.sort((a, b) => a.price - b.price)
        }
    }

    const filterProduct = (product) => {
        return filterProductForCategory(product)
            && filterProductByColor(product)
            && filterProductBySize(product)
            && filterProductByBrand(product)

    }

    useEffect(() => {
        dispatch(productsLoadedAsync())
    }, [])

    return (
        <div className="page" >
            <h1>{categoryName}{subCategoryName && `/${subCategoryName}`}</h1>
            <ProductFilterBar productList={products.filter(p => filterProductForCategory(p))}
                onfilterListChanged={handleFilterChanged} />

            <div className="product-list-wrapper flex">

                {
                    products && sortProducts(products).filter(p => filterProduct(p)).map((p, i) => <ProductInfoCard key={i} product={p} />)
                }
            </div>
        </div>
    )
}
