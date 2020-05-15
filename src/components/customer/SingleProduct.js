import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/product.css'
import { productsLoadedAsync } from '../../redux/actions/customer/product.actions'
import CurrencyFormat from 'react-currency-format';
import { useLocation } from 'react-router-dom';
import { productLoadedByIDAsync } from "../../redux/actions/admin-panel/product.actions";
import AddToCartButton from "./AddToCartButton";

export default function SingleProduct() {
  const [selected_size, setSize] = useState("");
  const [qty, setQty] = useState(0);
const [selectedProduct, setSelectedProduct] = useState(null);
	const dispatch = useDispatch();
	
	const products = useSelector(state => state.product.products);

	useEffect(()=>{
		dispatch(productsLoadedAsync());

	},[])

	useEffect(()=>{
		
		const id = '5ebcd85245b34811f0e9497f';
		const _selectedProduct = products.find(p => p._id === id);
		setSelectedProduct(_selectedProduct);
		console.log(selectedProduct)
    },[products])
 

  //   dispatch(productLoadedByIDAsync("5eb52be16177293bb4c683ba"));

  const checkOffer = (offer) => {
    if (offer > 0) {
      return true;
    } else {
      return false;
    }
  };

  const checkNew = (date) => {
    const msDiff = new Date().getTime() - new Date(date).getTime(); //Future date - current date
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
              {checkNew(selectedProduct.addedDate) ? (
                <p class="newarrival text-center">NEW</p>
              ) : (
                ""
              )}

              <h2>{selectedProduct.name}</h2>
              <p>product code: {selectedProduct._id}</p>
              <p>{selectedProduct.description}</p>

              <img src={require('../../assets/stars.png')} class="stars" />

              {checkOffer(selectedProduct.discount) ? (
                <CurrencyFormat
                  value={selectedProduct.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={""}
                  renderText={(value) => (
                    <p class="price">
                      LKR. <s>{value}</s>{" "}
                      {totalPrice(
                        selectedProduct.discount,
                        selectedProduct.price
                      )}
                    </p>
                  )}
                />
              ) : (
                <CurrencyFormat
                  value={selectedProduct.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={""}
                  renderText={(value) => <p class="price">LKR. {value} </p>}
                />
              )}

              <label>Select Size</label>
              <div className="select">
                <select
                  id="leave"
                  onChange={(e) => {
                    setSize(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                   {/* <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option> */}
                        {
							selectedProduct.sizeQty.map(s =>(
							<option value={s.size}>{s.size}</option>
							))
						}
                </select>
              </div>

              <hr />
              <p>
                <b>Availability : </b>
                {selectedProduct.qty} In Stock
              </p>
              <p>
                <b>Condition : </b>New
              </p>
              <p>
                <b>Brand : </b>
                {selectedProduct.brand}
              </p>
              <label>
                <b>Quantitiy : </b>{" "}
              </label>
              <input
                type="number"
                value="1"
                onChange={(e) => setQty(e.target.value)}
              />
              {/* <button type="button" class="btn btn-default cart">
                Add to Cart
              </button> */}

              <AddToCartButton
                productId={selectedProduct._id}
                qty={qty}
                size={selected_size}
              />
            </div>

          </div>

        </div>

      )}
    </div>
  );
}
