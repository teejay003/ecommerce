

function ProductReducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        loading: false,
      }
    case 'SET_PRODUCT':
      return {
        ...state,
        product: action.payload,
        loading: false,
      }
  
    default:
      break;
  }
}

export default ProductReducer