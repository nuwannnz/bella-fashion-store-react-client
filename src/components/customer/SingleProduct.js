import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/product.css'
import { productsLoadedAsync } from '../../redux/actions/customer/product.actions'
import CurrencyFormat from 'react-currency-format';
import { useLocation } from 'react-router-dom';

export default function SingleProduct() {

	const [selected_size, setSize] = useState("");
const [selectedProduct, setSelectedProduct] = useState(null);
	const dispatch = useDispatch();
	

	const product = useSelector(state => state.product.singleProduct);
	const products = useSelector(state => state.product.products);
	console.log(product)

	useEffect(()=>{
		dispatch(productsLoadedAsync());

	},[])

	useEffect(()=>{
		
		const id = '5ebad020755b7d2d343581ba';
		// meka usestate ekak dapan
		const _selectedProduct = products.find(p => p._id === id);
		setSelectedProduct(_selectedProduct);
		console.log(selectedProduct)
    },[products])

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
				{selectedProduct && (
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
					{checkNew(selectedProduct.addedDate) ? <p class="newarrival text-center">NEW</p> : '' }
					
					<h2>{selectedProduct.name}</h2>
					<p>product code: {selectedProduct._id}</p>
					<p>{selectedProduct.description}</p>
					
					<img src={require('../../assets/stars.png')} class="stars" />
					
		{checkOffer(selectedProduct.iscount) ? <CurrencyFormat value={selectedProduct.price} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value =><p class="price">LKR. <s>{value}</s> {totalPrice(product.product_discount, product.product_price)}</p>} /> :
					<CurrencyFormat value={product.product_price} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value =><p class="price">LKR. {value} </p> }/>}
					
					<label>Select Size</label>
                    <div className="select">
                    <select id="leave" onChange={e => {setSize(e.target.value); console.log(e.target.value)}}>
                        {/* <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option> */}
                        {
							selectedProduct.sizeQty.map(s =>(
							<option value={s.size}>{s.size}</option>
							))
						}
\
                    </select>
                    </div>
					
					<hr />
					<p><b>Availability : </b>{/*selectedProduct.filter(s => s.sizeQty.size === selected_size).map(p => (<div>{p.qty}</div>))*/} In Stock</p>
					<p><b>Condition : </b>New</p>
					<p><b>Brand : </b>{selectedProduct.brand}</p>
					<label><b>Quantitiy : </b> </label> 
					<input type="text" value="1" />
					<button type="button" class="btn btn-default cart">Add to Cart</button>
					</div>
					
		</div>
		
		</div>
			
				)}
			</div>
        )
    
}
