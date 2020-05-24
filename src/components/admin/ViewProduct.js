import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/admin/ViewProduct.css'
import { brandsLoadedAsync } from '../../redux/actions/admin-panel/brand.actions';
import { productsLoadedAsync } from '../../redux/actions/customer/product.actions';
import { categoriesAsync } from '../../redux/actions/admin-panel/category.actions';
import LoadingScreen from 'react-loading-screen';

export default function ViewProduct({pid}) {

    const products = useSelector(state => state.product.products);
    const loading = useSelector(state => state.product.loading);
    const brands = useSelector(state => state.brand.brands);
    const categories = useSelector(state => state.category.categories);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [brandName, setBrandName] = useState("")
    const [brand, setBrand] = useState([]);
    const [category, setSelectedCategory] = useState([]);
    const [subCategory, setSelectedSubCategory] = useState([]);
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(brandsLoadedAsync());
        dispatch(productsLoadedAsync());
        dispatch(categoriesAsync());

  },[])
    
    useEffect(()=>{
		const id = pid;
		const _selectedProduct = products.find(p => p._id === id);
        setSelectedProduct(_selectedProduct);
        setBrandName(selectedProduct && selectedProduct.brand)
      
		const _selectedbrand = brands.find(b => b.name === brandName);
        setBrand(_selectedbrand);
    }, [brands, products]);
    
    useEffect(()=>{
        if(selectedProduct){

            setSelectedCategory(categories.find(c => c._id === selectedProduct.category));
        }
        
        
     },[selectedProduct])

     useEffect(()=>{
        
        //setSelectedSubCategory(category.subcategory.find(c => c._id === selectedProduct.subCategory))
        //setSelectedSubCategory(categories.find(c => c._id === category._id).subcategory.find(s => s._id === category.subcategory._id))
         console.log(category)
      },[category])
     
        return (
            
            <div className="model-style">
                   <LoadingScreen
                        loading={loading}
                        bgColor='#f1f1f1'
                        spinnerColor='#8c52ff'
                        textColor='#8c52ff'
                        
                        text='Loading.. Please wait'
                        > 
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
                <div className="text-viewpage col-md-8">{category && category.name}</div></div> <hr />
                <div className="row">
                <div className="text-label col-md-4">Product Sub Category :</div>
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
                </LoadingScreen>
            </div>
        )
    
}
