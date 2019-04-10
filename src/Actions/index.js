import { products } from '../Data/products'


//get all products
export const loadProducts = () =>{
    return(dispatch) =>{
        dispatch(loadAll(products));
    }
}

//get single product
export const getProduct = (state=[],product_name) =>{
    return(dispatch) =>{
        const product = state.products.find(item =>{
            return item.name === product_name
        })
        dispatch(loadOneProduct(product));
    }

}

//update product when edited
export const updateProduct = (state =[],product) =>{
    return(dispatch) =>{
        const updatedList = state.products.filter(item => item.name !== product.name);
        updatedList.push(product);
        dispatch(loadAll(updatedList));
    }
}

export const loadAll = (products) =>{
    return{
        type:"GET_PRODUCTS",
        products:products
    }
}

export const loadOneProduct = (product) =>{
    return {
        type:"LOAD_PRODUCT",
        product:product
    }
}