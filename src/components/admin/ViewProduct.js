import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/admin/ViewProduct.css'
import { brandsLoadedAsync } from '../../redux/actions/admin-panel/brand.actions';
import { productsLoadedAsync } from '../../redux/actions/customer/product.actions';


export default function ViewProduct({pid}) {

    const products = useSelector(state => state.product.products);
    const brands = useSelector(state => state.brand.brands);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [brandName, setBrandName] = useState("")
    const [brand, setBrand] = useState([]);
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(brandsLoadedAsync());
        dispatch(productsLoadedAsync())
  },[products, brands])
    
    useEffect(()=>{
		console.log(pid)
		const id = pid;
		const _selectedProduct = products.find(p => p._id === id);
        setSelectedProduct(_selectedProduct);
        setBrandName(selectedProduct && selectedProduct.brand)
        console.log(selectedProduct)
		const _selectedbrand = brands.find(b => b.name === brandName);
        setBrand(_selectedbrand);
    }, [brands, products])


        return (
            
            <div className="model-style">
                {selectedProduct && brand && (
                    <div>
                <div className="row">
                    <div className="text-label col-md-4"> Product Images :</div>
                    <div className="text-viewpage col-md-8">
                        {selectedProduct.images.map(image => (
                            <img className="viewimg" src={image}></img>
                        ))}
                    </div>
                </div> <hr />
                <div className="row">
                <div className="text-label col-md-4">Product ID :</div>
                <div className="text-viewpage col-md-8">{selectedProduct._id}</div></div> <hr />
                <div className="row">
                <div className="text-label col-md-4">Product Name :</div>
                <div className="text-viewpage col-md-8">{selectedProduct.name}</div></div><hr />
                <div className="row">
                <div className="text-label col-md-4">Product Brand :</div>
                <div className="text-viewpage col-md-8"><img className="viewimg" src={brand.images} alt={brand.name}></img></div></div><hr />
                <div className="row">
                <div className="text-label col-md-4">Product Category :</div>
                <div className="text-viewpage col-md-8">{selectedProduct.subCategory}</div></div> <hr />
                <div className="row">
                <div className="text-label col-md-4">Product Price :</div>
                <div className="text-viewpage col-md-8">LKR. {selectedProduct.price}</div></div> <hr />
                <div className="row">

                <div className="text-label col-md-4">Product Discount :</div>
                <div className="text-viewpage col-md-8">{selectedProduct.discount}</div></div> <hr />
                <div className="row">
                <div className="text-label col-md-4">Product Color :</div>
                <div className="text-viewpage col-md-8"> <div className="view-color" style={{backgroundColor: selectedProduct.colors}}></div>{selectedProduct.colors}</div></div> <hr />
                <div className="row">
                <div className="text-label col-md-4">Product Tags :</div>
                <div className="text-viewpage col-md-8">{selectedProduct.tags}</div></div> <hr />
                <div className="row">
                <div className="text-label col-md-4">Product Description :</div>
                <div className="text-viewpage col-md-8">{selectedProduct.description}</div></div> <hr />
                <div className="row">
                <div className="text-label col-md-4">Product Added Date :</div>
                <div className="text-viewpage col-md-8">{selectedProduct.addedDate}</div></div> <hr />
                <div className="row">
                <div className="text-label col-md-4">Product Updated Date :</div>
                <div className="text-viewpage col-md-8">{selectedProduct.updatedDate}</div></div> <hr />

                </div>
                )}
            </div>
        )
    
}
