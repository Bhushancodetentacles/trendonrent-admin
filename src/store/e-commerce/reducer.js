import {
  GET_CART_DATA_FAIL,
  GET_CART_DATA_SUCCESS,
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_SUCCESS,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  GET_ORDERS_FAIL,
  GET_ORDERS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  GET_SHOPS_FAIL,
  GET_SHOPS_SUCCESS,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_DETAIL_FAIL,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  GET_PRODUCT_COMMENTS_SUCCESS,
  GET_PRODUCT_COMMENTS_FAIL,
  ON_LIKE_COMMENT_SUCCESS,
  ON_LIKE_REPLY_SUCCESS,
  ON_ADD_REPLY_SUCCESS,
  ON_ADD_COMMENT_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  GET_LOYALTY_SUCCESS,
  GET_LOYALTY_FAIL,
  ADD_LOYALTY_SUCCESS,
  ADD_LOYALTY_FAIL,
  UPDATE_LOYALTY_SUCCESS,
  UPDATE_LOYALTY_FAIL,
  GET_ORDER_DETAIL_SUCCESS,
  GET_ORDER_DETAIL_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  products: [],
  product: {},
  orders: [],
  cartData: {},
  customers: [],
  shops: [],
  category: [],
  error: {},
  productComments: [],
  loyalty: [],
}

export const Ecommerce = (state = INIT_STATE, action) => {
  switch (action.type) {
    // PRODUCTS
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      }

    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
      }

    case ADD_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map(product =>
          product.productId + "" === action.payload.productId + ""
            ? { product, ...action.payload }
            : product
        ),
      }

    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          product => product.productId !== action.payload
        ),
      }

    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        product: action.payload,
      }

    case GET_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // ORDERS
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      }

    case GET_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      }

    case ADD_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.map(order =>
          order.orderId + "" === action.payload.orderId + ""
            ? { order, ...action.payload }
            : order
        ),
      }

    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter(order => order.orderId !== action.payload),
      }

    case DELETE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case GET_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      }

    case GET_ORDER_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case GET_CART_DATA_SUCCESS:
      return {
        ...state,
        cartData: action.payload,
      }

    case GET_CART_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      }

        // CUSTOMER
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
      }

    case GET_CUSTOMERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: [...state.customers, action.payload],
      }

    case ADD_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.map(customer =>
          customer.id.toString() === action.payload.id.toString()
            ? { customer, ...action.payload }
            : customer
        ),
      }

    case UPDATE_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.filter(
          customer => customer.id.toString() !== action.payload.toString()
        ),
      }

    case DELETE_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_SHOPS_SUCCESS:
      return {
        ...state,
        shops: action.payload,
      }

    case GET_SHOPS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_PRODUCT_COMMENTS_SUCCESS:
    case ON_LIKE_COMMENT_SUCCESS:
    case ON_LIKE_REPLY_SUCCESS:
    case ON_ADD_REPLY_SUCCESS:
    case ON_ADD_COMMENT_SUCCESS:
      return {
        ...state,
        productComments: action.payload,
      }

    case GET_PRODUCT_COMMENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // CATEGORY
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        category: [...state.category, action.payload],
      }

    case GET_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        category: [...state.category, action.payload],
      }
    case ADD_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: state.category.filter(
          category => category.categoryId !== action.payload
        ),
      }
    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // LOYALTY
    case GET_LOYALTY_SUCCESS:
      return {
        ...state,
        loyalty: [...state.loyalty, action.payload],
      }

    case GET_LOYALTY_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ADD_LOYALTY_SUCCESS:
      return {
        ...state,
        loyalty: [...state.loyalty, action.payload],
      }
    case ADD_LOYALTY_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case UPDATE_LOYALTY_SUCCESS:
      return {
        ...state,
        loyalty: state.loyalty.map(loyalty =>
          loyalty.CustomerId + "" === action.payload.CustomerId + ""
            ? { loyalty, ...action.payload }
            : loyalty
        ),
      }
    case UPDATE_LOYALTY_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
