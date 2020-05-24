import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadBannersAsync, loadCategoryBannersAsync } from "../../redux/actions/banners.actions";
import { Link } from 'react-router-dom';
import { ProductInfoCard } from './ProductListPage';
import { productsLoadedAsync } from '../../redux/actions/customer/product.actions';

export default function WelcomePage() {

    const dispatch = useDispatch()
    const banners = useSelector(state => state.homepage.banners);
    const catBanners = useSelector(state => state.homepage.categoryBanners);

    useEffect(() => {
        dispatch(loadBannersAsync())
        dispatch(loadCategoryBannersAsync())
        dispatch(productsLoadedAsync())
    }, [])

    return (
        <div className="welcome-page">
            <BannerSlider banners={banners} />
            <NewArrivals />

            <CategoryBanners catBanners={catBanners} />
        </div>
    )
}


function BannerSlider({ banners }) {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                {
                    banners && banners.map((b, i) => (
                        <div className={`carousel-item bella-slider-item ${i === 0 && 'active'}`}>
                            <Link to={b.link}>
                                <img src={b.image} className="d-block w-100" alt="..." />
                            </Link>
                        </div>

                    ))
                }

            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}

function NewArrivals() {

    const products = useSelector(state => state.product.products);


    return (
        <div className="new-arrivals mt-4">
            <h2 className="text-center mt-3 mb-3">New Arrivals</h2>
            <div className="new-arrivals-list d-flex justify-content-around">

                {products && products.sort((a, b) => {
                    return new Date(b.addedDate) - new Date(a.addedDate)
                }).slice(0, 4).map(p => (
                    <ProductInfoCard product={p} />
                ))}
            </div>
        </div>
    )
}

function CategoryBanners({ catBanners }) {

    return (
        <div className="category-banners mt-4">
            <h2 className="text-center mt-3" >Shop by categories</h2>

            {
                catBanners && catBanners.map((b, i) => (
                    <CategoryBannerItem banner={b} toLeft={i % 2 === 0} />
                ))
            }
        </div>
    )
}

function CategoryBannerItem({ banner, toLeft: imageToLeft = true }) {
    return (
        <div className="cat-banner">
            <Link to={banner.link}>
                {
                    imageToLeft && (
                        <div className="cat-banner-content">
                            <img className="cat-banner-img" src={banner.image} />
                            <div className="cat-banner-info to-right">
                                <span className="display-3">{banner.text}</span>
                            </div>
                        </div>

                    )

                }

                {
                    !imageToLeft && (
                        <div className="cat-banner-content">
                            <div className="cat-banner-info to-left">
                                <span className="display-3" >{banner.text}</span>
                            </div>
                            <img className="cat-banner-img" src={banner.image} />
                        </div>
                    )
                }
            </Link>

        </div>
    )
}