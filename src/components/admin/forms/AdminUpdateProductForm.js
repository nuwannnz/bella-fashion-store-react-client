import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from "../../common/ErrorMessage";
import { isEmpty } from "../../../helpers/input-validation.helper";
import TextBox from '../../common/TextBox';
import Files from 'react-butterfiles';
import AccentButton from '../../common/AccentButton';
import { brandsLoadedAsync } from '../../../redux/actions/admin-panel/brand.actions';
import { categoriesAsync } from '../../../redux/actions/admin-panel/category.actions'
import { clearProductsUpdatedSuccessMsg } from '../../../redux/actions/admin-panel/product.actions';
import SuccessMessage from '../../common/SuccessMessage';
import { ChromePicker } from 'react-color'
import '../../../styles/common/SelectBox.css'
import '../../../styles/common/IconButton.css'
import { sizesLoadedAsync } from '../../../redux/actions/admin-panel/size.actions';
import '../../../styles/product.css'
import LoadingScreen from 'react-loading-screen';


export default function AdminUpdateProductForm({onUpdateProductClick,pid,model}) {

    const dispatch = useDispatch();

    //redux states
    const brands = useSelector(state => state.brand.brands);
    const categories = useSelector(state => state.category.categories );
    const sizes = useSelector(state => state.size.sizes );
    const products = useSelector(state => state.product.products);
    const errorMsg = useSelector(state => state.product.errorMsg);
    const successMsg = useSelector(state => state.product.successMsg);
    const loading = useSelector(state => state.product.loading)


    const [product, setProduct] = useState({
        _id: pid, name: model.name, brand: model.brand, category: model.category, subCategory: model.subCategory, price: model.price, discount: model.discount, colors: model.color, tags: model.tags, description: model.description
    })

 
    const [sizeQty, setSizeQty] = useState([])
    const [showColorPicker, setshowColorPicker] = useState(false) 

    const [size, setSize] = useState("");
    const [qty, setQty] = useState("");

    const [colors, setColors] = useState(model.colors);

    const [images, setImages] = useState(model.images.map(i=>({src:{base64:i}}))); 
    const [subSelectedCategories, setSubCategories] = useState([]);



    const [selectedProduct, setSelectedProduct] = useState(null);

    
    const [invalidInput, setInvalidInput] = useState("");
    const [validInput, setValidInput] = useState("");

    const submitSizeQty = () => {
        if(isEmpty(size)) {
            setInvalidInput("Size is required");
        } else if(size == -1) {
            setInvalidInput("Size is required");
        } 
         else if(isEmpty(qty)) {
            setInvalidInput("quantity is required");
        } else {
    
            setSizeQty([...sizeQty, {size:size, qty:qty}]);
        }
    }

    //form handles
    const handleIdChanged = (pid) => {
        product.id = pid
        setProduct({...product});
    } 

    const handleNameChanged = (name) => {
        product.name = name
        setProduct({...product});
    } 

    const handleBrandChanged = (brand) => {
        product.brand = brand
        setProduct({...product});
    } 

    
    const handleCategoryChanged = (category) => {
        product.category = category
        setProduct({...product});
    } 

    const handleSubCategoryChanged = (subCat) => {
        product.subCategory = subCat
        setProduct({...product});
    } 
   

    const handlePriceChanged = (price) => {
        product.price = price
        setProduct({...product});
    } 

    const handleDiscountChanged = (discount) => {
        product.discount = discount
        setProduct({...product});
    } 

    const handleTagsChanged = (tags) => {
        product.tags = tags
        setProduct({...product});
    } 
   
    const handleDescriptionChanged = (description) => {
        product.description = description
        setProduct({...product});
    } 

    //--------------------
        
    const removeData = (index) => {
        console.log(index)
        const newArray = sizeQty

        if(index != -1) {
            newArray.splice(index, 1);
            setSizeQty([...newArray]);
        }

    }
     //use effects   
    useEffect(()=>{
		const id = pid;
		const _selectedProduct = products.find(p => p._id === id);
        setSelectedProduct(_selectedProduct);
   
        console.log(model)
       
    }, [pid, products])


    useEffect(()=>{
        if(selectedProduct){
            const sizeInf = selectedProduct.sizeQty.map(sq => ({size: sq.size, qty: sq.qty}));
            setSizeQty(sizeInf)
        }
    },[selectedProduct])

    useEffect(() => {
        dispatch(brandsLoadedAsync());
        dispatch(clearProductsUpdatedSuccessMsg());
        
    },[])
    
    
    useEffect(() => {
        dispatch(categoriesAsync())
    }, [])

    useEffect(()=>{
        if(categories && categories.length > 0){
            const cat = categories.find(c => c._id === model.category);
            setSubCategories(cat.subcategory)
        }
    }, [categories])

    useEffect(() => {
        dispatch(sizesLoadedAsync())
    }, [])
   //-------------------------------------------

//Image handlers
    const handleImages = (image, index) => {
        if (index === images.length) {
            setImages([...images, ...image]);
        } else {
            let updatedImages = [...images.slice(0, index - 1), ...image, ...images.slice(index + 1)]
            setImages(updatedImages)
        }

    }
    const removeImage = (index) => {
        images.splice(index, 1);
        setImages([...images]);
    }

    const handleImageErrors = (error) => {
        console.log(error);
    }
   

    // form submit
    const submitForm = () => {

        // if (isEmpty(product.name)) {
        //     setInvalidInput("product name is required");
        //     setValidInput("");
        // } else if (isEmpty(sizeQty)) {
        //     setInvalidInput("product qty and sizes are required");
        //     setValidInput("");
        
        // }else if (isEmpty(product.brand)) {
        //     setInvalidInput("product brand is required");
        //     setValidInput("");

        // } else if (isEmpty(product.category)) {
        //     setInvalidInput("product category is required");
        //     setValidInput("");

        // }else if (isEmpty(product.subCategory)) {
        //     setInvalidInput("product category is required");
        //     setValidInput("");

        // } else if (isEmpty(product.price)) {
        //     setInvalidInput("product price is required");
        //     setValidInput("");

        // } else if (isEmpty(product.discount)) {
        //     setInvalidInput("product discount is required");
        //     setValidInput("");

        // } else if (isEmpty(product.colors)) {
        //     setInvalidInput("product colors is required");
        //     setValidInput("");

        // } else if (isEmpty(product.tags)) {
        //     setInvalidInput("product tags is required");
        //     setValidInput("");

        // } else if (isEmpty(product.description)) {
        //     setInvalidInput("product description is required");
        //     setValidInput("");

        // }
        //  else {
            setInvalidInput("");
            const formData = new FormData();
            formData.append('_id', product._id)
            formData.append('name', product.name)

            formData.append('sizeQty', JSON.stringify(sizeQty));

            formData.append('brand', product.brand)
            formData.append('category', product.category)
            formData.append('subCategory', product.subCategory)
            formData.append('price', product.price)
            formData.append('discount', product.discount)
            formData.append('colors', colors)
            formData.append('tags', product.tags)
            formData.append('description', product.description)

            images.forEach((image, i, a) => {
                formData.append(`images[]`, image.src.file);
            })

            console.log(formData.get('images[]'));
            onUpdateProductClick(
               formData
                
            );
            setValidInput(successMsg);
        // }


    }
   
        return (
            <div className="model-style" style={{minWidth: '700px'}}>
                 <LoadingScreen
                loading={loading}
                spinnerColor='#8c52ff'
                textColor='#8c52ff'
                
                text='Loading.. Please wait'
            > 

         <div className="containerForm">
         <TextBox 
             name="product_id"
             placeholder="Enter Product id here"
             label="Prodcut ID"
             animateTitle={false}
             disabled="true"
             value={product._id}
             onTextChange={handleIdChanged} />
            
            <div className="row">
            <div className="col-md-12">
                    <TextBox 
                    name="product_name"
                    placeholder="Enter Product name here"
                    label="Prodcut name"
                    animateTitle={false}
                    value={product.name}
                    onTextChange={handleNameChanged} />
                </div>
            </div>               
                <hr />
                    <div className="row">
                <div className="col-md-6">
                        <label>Select Size :</label>

                        <div className="select-box">
                            <select onChange={e => { setSize(e.target.value); console.log(e.target.value) }}>
                                <option className="default-option" value="-1">- pick a size -</option>
                                {sizes && sizes.map(sizes => (
                                    <option value={sizes.name}>{sizes.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                 
                    <div className="col-md-5">
                        <TextBox 
                        name="product_qty"
                        placeholder="You can enter quatity here"
                        label="Product quantity"
                        onTextChange={text => setQty(text)} />
                    </div>
                    <div className="col-md-1 icon-btn">
                    <button class="iconBtn" onClick={submitSizeQty}><i class="fa fa-plus"></i></button>
                    </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <td colSpan="3">Sizes and Quantities</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                        {sizeQty && sizeQty.map((sizes, index) => (
                                            <tr key={index}>
                                            <td>
                                                <p> {sizes.size}</p>
                                            </td>
                                        <td>
                                            <p> {sizes.qty}</p>
                                        </td>
                                        <td>
                                            <button className="button buttonDelete" onClick={() => removeData(index)}> <i className="fa fa-trash"></i> </button>
                                        </td>
                                            </tr> ))}
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr />
                <div className="row">
                <div className="col-md-12">  
                    <label>Brands :</label>

                        <div className="select-box">

                        <select value={product.brand} onChange={handleBrandChanged}>
                            {brands && brands.map(brand => (
                                <option value={brand.name}>{brand.name}</option>
                            ))}   
                        </select>
                        </div>
                
                    </div>
                </div>
                
                <hr />
            <div className="row">
                <div className="col-md-6"> 
                    <label>Category</label>

                    <div className="select-box">

                    <select id="leave" onChange={handleCategoryChanged}>
                     
                        {categories.map(category => (
                                    <option value={category._id}>{category.name}</option>
                                ))}
                    
                    </select>
                    </div>

            </div>
                <div className="col-md-6"> 
                    <label>Sub-Category</label>
                    <div className="select-box">
                    <select id="leave"  onChange={handleSubCategoryChanged}>
                        {
                                  subSelectedCategories.map(subcat => (
                                        <option value={subcat._id} selected={subcat._id === model.subCategory} >{subcat.name}</option>
                                   ))
                                }
\
                    </select>
                    </div>
            </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-md-6"> 
                    <TextBox 
                    name="product_price"
                    placeholder="Enter Product price here"
                    label="Prodcut price"
                    animateTitle={false}
                    type="number"
                    value={product.price}
                    onTextChange={handlePriceChanged} />
                </div>
                <div className="col-md-6"> 
                    <TextBox 
                    name="product_discount"
                    placeholder="Enter Product discount here"
                    label="Prodcut discount"
                    type="number"
                    animateTitle={false}
                    value={product.discount}
                    onTextChange={handleDiscountChanged} />
                </div>
            </div>
            <hr />
            <div className="row">
            <div className="row col-md-6 color-picker">
                   <button className="button color-btn" onClick={() => setshowColorPicker(showColorPicker => ! showColorPicker)}>
                       {showColorPicker ? 'Close color picker' : 'Pick a Color'}

                   </button>
                   {showColorPicker && (
                       
                       <ChromePicker 
                            color={colors}
                            onChange={updatedColor => setColors(updatedColor.hex)} />
                            
                   )}
                    

                    <div className="view-color" style={{backgroundColor: colors}}></div>
                    
                    </div>
                <div className="col-md-6"> 
                    <TextBox 
                    name="product_tags"
                    placeholder="Enter Product tags here"
                    label="Prodcut tags"
                    animateTitle={false}
                    value={product.tags}
                    onTextChange={handleTagsChanged} />
                </div>
            </div>
            <TextBox 
             name="product_description"
             placeholder="Enter Product description here"
             label="Prodcut description"
             animateTitle={false}
             type="textarea"
             value={product.description}
             onTextChange={handleDescriptionChanged} />
            <hr />
            <div className="row">
                    <div class="col">

                        <div>
                            <Files
                                multiple
                                convertToBase64
                                accept={["image/jpg", "image/jpeg", "image/png"]}
                                onError={handleImageErrors}
                                onSuccess={files =>
                                    // Will append images at the end of the list.
                                    this.handleImages(files, images.length)
                                }
                            >
                                {({ browseFiles, getDropZoneProps }) => (
                                    <div

                                    >
                                        <p>Product images (Max 3 images)</p>
                                        <div className="image-upload-list">
                                            {images.map((image, index) => (
                                                <li className="image-item"
                                                    style={{ width: '100px', height: '120px' }}
                                                    key={index}

                                                >
                                                    <span onClick={() => removeImage(index)} className="remove-image-btn">X</span>
                                                    <img alt="product image" src={image.src.base64} style={{ width: '100%' }} />
                                                </li>
                                            ))}
                                            <li
                                                className="new-image"
                                                onClick={() => {
                                                    browseFiles({
                                                        onErrors: handleImageErrors,
                                                        onSuccess: files => {

                                                            handleImages(
                                                                files,
                                                                images.length
                                                            );
                                                        }
                                                    });
                                                }}
                                            >
                                                <div>+</div>
                                            </li>
                                        </div>
                                    </div>
                                )}
                            </Files>

                        </div>

                    </div>
                </div>
                <hr />


    
            <AccentButton onButtonClick={submitForm} text="UPDATE" />
           
           

                
            </div>
          </LoadingScreen>
            </div>
                
        )
    
}
