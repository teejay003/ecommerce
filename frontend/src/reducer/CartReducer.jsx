

function CartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
      };

    case "GET_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
      };
    
    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
      };

    default:
      break;
  }
}


export default CartReducer