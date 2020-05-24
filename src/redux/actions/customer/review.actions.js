import { getReviewsOfProduct, addProductReview, upVoteProductReview, downVoteProductReview, deleteProductReview } from "../../../services/customer/review.service"
import { displayToastAsync } from "../toast.actions";
import { buildNotification, NOTIFICATION_TYPE } from "../../../helpers/notification.helper";

export const PRODUCT_REVIEW_ACTIONS = {
    LOAD_PRODUCT_REVIEW: 'LOAD_PRODUCT_REVIEW',
    CLEAR_PRODUCT_REVIEWS: 'CLEAR_PRODUCT_REVIEWS',
    ADD_PRODUCT_REVIEW: 'ADD_PRODUCT_REVIEW',
    UP_VOTE_PRODUCT_REVIEW: 'UP_VOTE_PRODUCT_REVIEW',
    DOWN_VOTE_PRODUCT_REVIEW: 'DOWN_VOTE_PRODUCT_REVIEW',
    DELETE_PRODUCT_REVIEW: 'DELETE_PRODUCT_REVIEW'
}

export const clearReviews = () => ({
    type: PRODUCT_REVIEW_ACTIONS.CLEAR_PRODUCT_REVIEWS
})


export function loadProductReviewsAsync(productId) {
    return async (dispatch) => {
        const result = await getReviewsOfProduct(productId);

        if (result.isResultOk()) {
            dispatch({ type: PRODUCT_REVIEW_ACTIONS.LOAD_PRODUCT_REVIEW, payload: result.data });
            return true;
        } else {
            return false;
        }
    }
}


export function addProductReviewAsync(reviewDto) {
    return async (dispatch, getState) => {
        const { token } = getState().customer;
        const result = await addProductReview(token, reviewDto);


        if (result.isResultOk()) {
            dispatch({ type: PRODUCT_REVIEW_ACTIONS.ADD_PRODUCT_REVIEW, payload: result.data });
            dispatch(displayToastAsync(buildNotification("Created your review successfully", NOTIFICATION_TYPE.SUCCESS)))
            return true;
        } else {
            dispatch(displayToastAsync(buildNotification("Failed to create your review. Please try again", NOTIFICATION_TYPE.ERROR)))
            return false;
        }
    }
}

export function upVoteProductReviewAsync(reviewId) {
    return async (dispatch, getState) => {
        const { token } = getState().customer;
        const result = await upVoteProductReview(token, reviewId);


        if (result.isResultOk()) {
            dispatch({ type: PRODUCT_REVIEW_ACTIONS.UP_VOTE_PRODUCT_REVIEW, payload: reviewId });
            dispatch(displayToastAsync(buildNotification("Up voted successfully", NOTIFICATION_TYPE.SUCCESS)))

            return true;
        } else {
            dispatch(displayToastAsync(buildNotification("Failed to up vote. Please try again", NOTIFICATION_TYPE.ERROR)))

            return false;
        }
    }
}

export function downVoteProductReviewAsync(reviewId) {
    return async (dispatch, getState) => {
        const { token } = getState().customer;
        const result = await downVoteProductReview(token, reviewId);


        if (result.isResultOk()) {
            dispatch({ type: PRODUCT_REVIEW_ACTIONS.DOWN_VOTE_PRODUCT_REVIEW, payload: reviewId });
            dispatch(displayToastAsync(buildNotification("Down voted successfully", NOTIFICATION_TYPE.SUCCESS)))

            return true;
        } else {
            dispatch(displayToastAsync(buildNotification("Failed to down vote. Please try again", NOTIFICATION_TYPE.ERROR)))

            return false;
        }
    }
}



export function deleteProductReviewAsync(reviewId) {
    return async (dispatch, getState) => {
        const { token } = getState().customer;
        const result = await deleteProductReview(token, reviewId);


        if (result.isResultOk()) {
            dispatch({ type: PRODUCT_REVIEW_ACTIONS.DELETE_PRODUCT_REVIEW, payload: reviewId });
            dispatch(displayToastAsync(buildNotification("Deleted review successfully", NOTIFICATION_TYPE.SUCCESS)))

            return true;
        } else {
            dispatch(displayToastAsync(buildNotification("Failed to delete review. Please try again", NOTIFICATION_TYPE.ERROR)))

            return false;
        }
    }
}



