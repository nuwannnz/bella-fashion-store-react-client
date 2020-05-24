import { PRODUCT_REVIEW_ACTIONS } from "../../actions/customer/review.actions";

const initialState = {
    items: []
}

export const review = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_REVIEW_ACTIONS.LOAD_PRODUCT_REVIEW:
            return {
                items: action.payload
            }

        case PRODUCT_REVIEW_ACTIONS.CLEAR_PRODUCT_REVIEWS:
            return initialState

        case PRODUCT_REVIEW_ACTIONS.ADD_PRODUCT_REVIEW:
            return {
                items: [action.payload, ...state.items]
            }

        case PRODUCT_REVIEW_ACTIONS.UP_VOTE_PRODUCT_REVIEW:
            return {
                items: [...state.items.map(r => {
                    if (r._id === action.payload) {
                        r.upVotes = r.upVotes + 1
                    }
                    return r;
                })]
            }

        case PRODUCT_REVIEW_ACTIONS.DOWN_VOTE_PRODUCT_REVIEW:
            return {
                items: [...state.items.map(r => {
                    if (r._id === action.payload) {
                        r.downVotes = r.downVotes + 1
                    }
                    return r;
                })]
            }

        case PRODUCT_REVIEW_ACTIONS.DELETE_PRODUCT_REVIEW:
            return {
                items: [...state.items.filter(r => r._id !== action.payload)]
            }
        default:
            return state;
    }
}