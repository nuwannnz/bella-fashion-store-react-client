
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/product.css'
import { productsLoadedAsync } from '../../redux/actions/customer/product.actions'
import CurrencyFormat from 'react-currency-format';
import { useLocation } from 'react-router-dom';
import { productLoadedByIDAsync } from "../../redux/actions/admin-panel/product.actions";
import { brandsLoadedAsync } from "../../redux/actions/admin-panel/brand.actions"
import AddToCartButton from "./AddToCartButton";
import '../../styles/common/SelectBox.css';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';


export default function SingleProduct({productId}) {
  const [selected_size, setSize] = useState("");
  const [qty, setQty] = useState(0);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const[id, setID] = useState("");
  const [brand, setBrand] = useState([]);
  const [brandName, setBrandName] = useState("")
  const [selectedSize, setSelectedSize] = useState([]);
  const products = useSelector(state => state.product.products);
  
  

  
	useEffect(()=>{
		dispatch(productsLoadedAsync());
    dispatch(brandsLoadedAsync());
  },[])
 
  const brands = useSelector(state => state.brand.brands);
   
  useEffect(()=>{
    setID(productId);

    if(!products || !brands){
      return;
    }
		const _selectedProduct = products.find(p => p._id === productId);
    setSelectedProduct(_selectedProduct);
    setBrandName(selectedProduct && selectedProduct.brand)
    console.log(brandName)
    const _brand = brands.find(b => b.name === brandName);
    console.log(_brand)
		setBrand(_brand);
		
    }, [brands, products])



  // useEffect(() => {

  //   const id = '5ebad020755b7d2d343581ba';
  //   // meka usestate ekak dapan
  //   const _selectedProduct = products.find(p => p._id === id);
  //   setSelectedProduct(_selectedProduct);
  //   console.log(selectedProduct)
  // }, [products])
  const RadioOnChange = (value) => {
    setSelectedSize(selectedProduct.sizeQty.find(s => s.size == value));

  }

  

  const checkOffer = (offer) => {
    if (offer > 0) {
      return true;
    } else {
      return false;
    }
  };
  const checkNew = (date) => {
    const msDiff = new Date().getTime() - new Date(date).getTime();   //Future date - current date
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
    <div class="container-fluid">

      {selectedProduct && (
        <div>



          <div class="row">

            <div class="col-md-5">


              <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" style={{maxHeight: '800px',maxWidth: '500px', borderRadius: '1em'}}>
                <div class="carousel-inner" >

                <div class="carousel-item active">
                  <img className="single-img" style={{maxHeight: '800px',maxWidth: '500px', borderRadius: '1em'}} src={selectedProduct.images[0]} class="d-block w-100" alt={selectedProduct.name} />
                </div>

                <div class="carousel-item">
                  <img className="single-img" style={{maxHeight: '800px',maxWidth: '500px', borderRadius: '1em'}} src={selectedProduct.images[1]} class="d-block w-100" alt="..." />
                </div>

                <div class="carousel-item">
                  <img className="single-img"  style={{maxHeight: '800px',maxWidth: '500px' , borderRadius: '1em'}}src={selectedProduct.images[2]} class="d-block w-100" alt="..." /> 
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

              <h2 style={{textTransform: 'uppercase'}}>{selectedProduct.name}</h2>

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


               <RadioGroup onChange={RadioOnChange} horizontal>
               {selectedProduct.sizeQty.map(s =>(
                    <ReversedRadioButton pointColor="purple" value={s.size}>
                        {s.size}
                    </ReversedRadioButton>
                    	))
                    }
                </RadioGroup>
                   
              <hr />
              <p>
                <b>Availability : </b>
                  {selectedSize.qty > 0 ? <b style={{color: 'green'}}>{selectedSize && selectedSize.qty} In Stock</b> : <b style={{color: 'red'}}>Not Available</b>} 
              </p>
              <p>
                <b>Condition : </b>New
              </p>
              <p>
                <b>Brand : </b>
                <img className="viewimg" src={brand && brand.images} />
                {}
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
                size={selectedSize}
              />

            </div>

          </div>

        </div>

      )}
    </div>
  )

}
