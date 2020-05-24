import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AccentButton from '../../../components/common/AccentButton';
import { POPUP_KEYS } from '../../../constants';
import { openPopup } from '../../../redux/actions/popup.actions';
import { loadBannersAsync, loadCategoryBannersAsync, deleteBannerAsync, deleteCategoryBannerAsync } from '../../../redux/actions/banners.actions';
import TabHeader from '../../../components/common/TabHeader';



const tabHeaders = ["Banners", "Category banners"];

export default function HomepageDashboard() {

    const dispatch = useDispatch();
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);


    useEffect(() => {
        dispatch(loadBannersAsync());
        dispatch(loadCategoryBannersAsync());
    })
    return (
        <div className="dashboard-page">
            <div className="page-content">
                <h1 className="page-title">Homepage Management</h1>
            </div>

            <TabHeader
                tabItems={tabHeaders}
                onTabItemClick={(i) => {
                    setSelectedTabIndex(i);
                }}
            />


            {selectedTabIndex === 0 && <BannerSection />
            }

            {selectedTabIndex === 1 && <CategoryBannerSection />}



        </div>

    )
}

function BannerSection() {
    const banners = useSelector(state => state.homepage.banners);
    const [deletingId, setDeletingId] = useState(-1);
    const dispatch = useDispatch();

    const onDeleteClick = (bannerId) => {
        setDeletingId(bannerId)
        dispatch(deleteBannerAsync(bannerId)).then(() => setDeletingId(-1))
    }

    return (
        <div className="tab-page">
            <div className="d-flex align-items-center">

                <h3>Banners</h3>
                <div style={{ width: '150px' }}>

                    <AccentButton text="Add banner" onButtonClick={() => dispatch(openPopup(POPUP_KEYS.ADD_BANNER_POPUP))} />
                </div>
            </div>
            <table className="orders-table table table-hover">
                <thead>
                    <th>Image</th>
                    <th>Link</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {banners && banners.map(b => (
                        <tr>
                            <td>
                                <img src={b.image} style={{ width: '200px' }} />
                            </td>
                            <td>
                                <a href={b.link}>{b.link}</a>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={() => onDeleteClick(b._id)}>
                                    {deletingId !== b._id &&
                                        <i className="far fa-trash-alt"></i>
                                    }
                                    {deletingId === b._id && (
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    )}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

function CategoryBannerSection() {
    const catBanners = useSelector(state => state.homepage.categoryBanners);
    const [deletingId, setDeletingId] = useState(-1);
    const dispatch = useDispatch();

    const onDeleteClick = (bannerId) => {
        setDeletingId(bannerId)
        dispatch(deleteCategoryBannerAsync(bannerId)).then(() => setDeletingId(-1))
    }

    return (
        <div className="tab-page">
            <div className="d-flex align-items-center">

                <h3>CategoryBanners</h3>
                <div style={{ width: '200px' }}>

                    <AccentButton text="Add category banner" onButtonClick={() => dispatch(openPopup(POPUP_KEYS.ADD_BANNER_POPUP, { isCategoryBanner: true }))} />
                </div>
            </div>
            <table className="orders-table table table-hover">
                <thead>
                    <th>Image</th>
                    <th>Link</th>
                    <th>Text</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {catBanners && catBanners.map(b => (
                        <tr>
                            <td>
                                <img src={b.image} style={{ width: '200px' }} />
                            </td>
                            <td>
                                <a href={b.link}>{b.link}</a>
                            </td>
                            <td>
                                <span>{b.text}</span>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={() => onDeleteClick(b._id)}>
                                    {deletingId !== b._id &&
                                        <i className="far fa-trash-alt"></i>
                                    }
                                    {deletingId === b._id && (
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    )}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}