import React, { useState, useCallback } from 'react'
import OverlayPopup from '../../../components/common/OverlayPopup'
import Rating from "react-rating";
import '../../../styles/rating.css';
import { useDispatch } from 'react-redux';
import { addProductReviewAsync } from '../../../redux/actions/customer/review.actions';

export default function ProductReviewForm({ productId, reviewToEdit, closePopup }) {

    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleRatingChange = useCallback((newRating) => {
        setRating(newRating);
    }, []);

    const handleSubmit = () => {
        dispatch(addProductReviewAsync({ productId, rating, comment })).then(() => closePopup())
    }

    return (
        <OverlayPopup
            title="Add a review"
            onSubmit={handleSubmit}
            onClosing={closePopup}>
            <div className="form-group d-flex align-items-center">
                <span>Rating: </span>
                <Rating className="stars" emptySymbol="fa fa-star-o fa-2x"
                    initialRating={rating}
                    onChange={(rating) => handleRatingChange(rating)}
                    fullSymbol="fa fa-star fa-2x"
                    fractions={2} />
            </div>

            <div class="form-group">
                <label for="comment">Comment: </label>
                <textarea class="form-control"
                    id="comment"
                    onChange={(e) => setComment(e.target.value)}
                    rows="3"></textarea>
            </div>
        </OverlayPopup>
    )
}
