import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/product.css'
import { productLoadedByIDAsync } from '../../redux/actions/admin-panel/product.actions'
import CurrencyFormat from 'react-currency-format';

export default function SingleProduct() {

	const [selected_size, setSize] = useState("");

	const dispatch = useDispatch();

	const product = useSelector(state => state.product.singleProduct);

	dispatch(productLoadedByIDAsync("5eb52be16177293bb4c683ba"));

	const checkOffer = (offer) => {
		if(offer > 0) {
			return true;
		} else {
			return false;
		}
	}

	const checkNew = (date) => {
		const msDiff = new Date().getTime() - new Date(date).getTime() ;   //Future date - current date
		const difference = Math.floor(msDiff / (1000 * 60 * 60 * 24));
		
		if(difference > 7) {
			return false;
		} else {
			return true;
		}
	}
	const totalPrice =(discount, price) => {
		return price - discount;
	}
	
        return (
            <div class="container">
				
				<div>

				
				
                <div class="row">
					
						<div class="col-md-5">
						
						<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
						  <div class="carousel-inner">
							<div class="carousel-item active">
							  <img src={require('../../assets/shirt.jpg')} class="d-block w-100" alt="..." />
							</div>
							<div class="carousel-item">
							  <img src={require('../../assets/shirt.jpg')} class="d-block w-100" alt="..." />
							</div>
							<div class="carousel-item">
							  <img src={require('../../assets/shirt.jpg')} class="d-block w-100" alt="..." />
							</div>
						  </div>
						  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
							<span class="carousel-control-prev-icon" aria-hidden="true"></span>
							<span class="sr-only">Previous</span>
						  </a>
						  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
							<span class="carousel-control-next-icon" aria-hidden="true"></span>
							<span class="sr-only">Next</span>
						  </a>
						</div>
					</div>
					<div class="col-md-7">
					{checkNew(product.product_added_date) ? <p class="newarrival text-center">NEW</p> : '' }
					
					<h2>{product.product_name}</h2>
					<p>product code: {product._id}</p>
					<p>{product.product_description}</p>
					
					<img src={require('../../assets/stars.png')} class="stars" />
					
		{checkOffer(product.product_discount) ? <CurrencyFormat value={product.product_price} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value =><p class="price">LKR. <s>{value}</s> {totalPrice(product.product_discount, product.product_price)}</p>} /> :
					<CurrencyFormat value={product.product_price} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value =><p class="price">LKR. {value} </p> }/>}
					
					<label>Select Size</label>
                    <div className="select">
                    <select id="leave" onChange={e => {setSize(e.target.value); console.log(e.target.value)}}>
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                        
\
                    </select>
                    </div>
					
					<hr />
					<p><b>Availability : </b>{product.product_qty} In Stock</p>
					<p><b>Condition : </b>New</p>
					<p><b>Brand : </b>{product.product_brand}</p>
					<label><b>Quantitiy : </b> </label> 
					<input type="text" value="1" />
					<button type="button" class="btn btn-default cart">Add to Cart</button>
					</div>
					
		</div>
		
		</div>
            </div>
        )
    
}
