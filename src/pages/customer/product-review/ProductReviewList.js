import React, { useState, useEffect, useMemo } from 'react'
import { loadProductReviewsAsync, upVoteProductReviewAsync, downVoteProductReviewAsync, deleteProductReviewAsync } from '../../../redux/actions/customer/review.actions'
import AccentButton from '../../../components/common/AccentButton'
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_KEYS, ROUTE_PATHS } from '../../../constants';
import { openPopup } from '../../../redux/actions/popup.actions';
import { useHistory } from 'react-router-dom';
import { displayToastAsync } from '../../../redux/actions/toast.actions';
import { buildNotification, NOTIFICATION_TYPE } from '../../../helpers/notification.helper';
import { getAssetUrl } from '../../../helpers/assets.helper';

export default function ProductReviewList({ productId }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.review);
    const { token } = useSelector(state => state.customer);
    const { customerInfo } = useSelector(state => state.customer);
    const orders = useSelector(state => state.order.items);

    const [loadingReviews, setLoadingReviews] = useState(true)

    useEffect(() => {

        dispatch(loadProductReviewsAsync(productId)).then(() => setLoadingReviews(false));
    }, [productId])

    const hasPurchasedProduct = useMemo(() => {
        if (orders.length === 0) {
            return false;
        }
        const purchasedProducts = [];
        orders.forEach(o => {
            o.items.forEach(item => {
                purchasedProducts.push(item.product?._id)
            })
        });
        return purchasedProducts.includes(productId);

    }, [productId, orders]);

    const hasReviewedAlready = useMemo(() => {
        if (reviews.items.length === 0) {
            return false;
        }

        const reviewedCustomers = reviews.items.map(i => i.customer.id);
        return reviewedCustomers.includes(customerInfo?.id)
    }, [reviews, customerInfo])

    const avgRatingValue = useMemo(() => {
        if (reviews.items.length === 0) {
            return 0;
        }
        let totalRating = 0;
        reviews.items.forEach(review => {
            totalRating += review.rating;
        });

        return totalRating / reviews.items.length;
    }, [reviews])

    const handleAddReviewClick = () => {
        if (!token) {
            history.push(ROUTE_PATHS.CUSTOMER_LOGIN);
            return;
        }

        // check if the user has purchased this item
        if (!hasPurchasedProduct) {
            dispatch(displayToastAsync(buildNotification("You can review only the products you have bought!", NOTIFICATION_TYPE.ERROR)))
            return;
        }

        if (hasReviewedAlready) {
            dispatch(displayToastAsync(buildNotification("You have already reviewed this product!", NOTIFICATION_TYPE.ERROR)))
            return;
        }

        dispatch(openPopup(POPUP_KEYS.PRODUCT_REVIEW_POPUP, { productId }))
    }
    return (
        <div className="product-review-wrap" >
            <div className="review-header d-flex flex-column align-items-center">
                <h3>Reviews</h3>

                <div style={{ width: '150px' }}>
                    <AvgReviewStars value={avgRatingValue} />
                </div>

                <div className="mt-3">
                    <AccentButton text="Add your review" onButtonClick={handleAddReviewClick} />
                </div>
            </div>
            {
                loadingReviews && (
                    <div class="d-flex justify-content-center mt-3">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                )
            }
            <div className="review-list d-flex justify-content-center mt-2">
                {
                    reviews.items && reviews.items.map(review => (
                        <Review review={review} />
                    ))
                }
            </div>

            {
                reviews && reviews.items.length === 0 && (
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img src={getAssetUrl('no-reviews.png')} style={{ width: '34%' }} alt="No reviews yet" />
                        <h4>This product doesn't have any reviews yet</h4>
                    </div>
                )
            }
        </div>
    )
}

function AvgReviewStars({ value = 0.0, fontSize = 39 }) {
    const styles = {
        star: {
            fontSize: `${fontSize}px`,
            color: `gold`
        },
        value: {
            fontSize: `${fontSize}px`
        }
    }
    return (
        <div className="avg-rating">
            <div className="flex justify-content-center">
                <span style={styles.value} >{value}</span>

                <span className="star ml-2" style={styles.star}>
                    {value <= 1 && <i className="far fa-star"></i>}
                    {value <= 4 && value >= 2 && <i className="fas fa-star-half-alt"></i>}
                    {value > 4 && <i className="fas fa-star"></i>}
                </span>
            </div>
        </div>
    )
}


function Review({ review }) {

    const history = useHistory();
    const dispatch = useDispatch();
    const { customerInfo } = useSelector(state => state.customer);
    const { token } = useSelector(state => state.customer);


    const handleThumbUp = () => {
        if (!token) {
            history.push(ROUTE_PATHS.CUSTOMER_LOGIN);
            return;
        }
        dispatch(upVoteProductReviewAsync(review._id))
    }

    const handleThumbDown = () => {
        if (!token) {
            history.push(ROUTE_PATHS.CUSTOMER_LOGIN);
            return;
        }
        dispatch(downVoteProductReviewAsync(review._id))
    }


    return (
        <div className="review">
            <div className="header d-flex justify-content-between align-items-center">
                <span>
                    {review.customer?.fName}
                    {customerInfo?.id === review.customer._id && <span class="badge badge-dark ml-1">Me</span>
                    }
                </span>
                <AvgReviewStars fontSize={20} value={review.rating} />
            </div>
            <div className="review-body">
                <p>
                    {review.comment}
                </p>
            </div>

            <div className="review-footer">
                <span className="thumb thumb-up mr-2" onClick={handleThumbUp}>
                    <i className="far fa-thumbs-up mr-1"></i>
                    <span className="thumb-count">{review.upVotes > 0 ? review.upVotes : ''}</span>
                </span>
                <span className="thumb thumb-down" onClick={handleThumbDown}>
                    <i className="far fa-thumbs-down mr-1"></i>
                    <span className="thumb-count">{review.downVotes > 0 ? review.downVotes : ''}</span>
                </span>

                {customerInfo?.id === review.customer._id &&
                    <span className="delete-review-btn" onClick={() => dispatch(deleteProductReviewAsync(review._id))} >
                        <i className="far fa-trash-alt" aria-hidden="true"></i>
                    </span>
                }
            </div>
        </div>
    )
}