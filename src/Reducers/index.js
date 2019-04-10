let defaultState = {
    products:[],
    singleProduct:null
}

const mainReducer = (state=defaultState,action) =>{
    switch (action.type){
        case "GET_PRODUCTS":
        return{
            ...state,
            products:action.products
        }

        case "LOAD_PRODUCT":
        return{
            ...state,
            singleProduct:action.product
        }


        default:
        return{
            ...state
        }
    }
}

export default mainReducer;