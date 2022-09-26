import { createSlice } from '@reduxjs/toolkit'
import {http} from '../../util/config'
const initialState = {
    arrProduct: [],
    productDetail: {},
    cart: [],
}

const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    // Get All Product 
    getProduct: (state, action) => {
        // Get data from payload
        const arrProduct = action.payload;
        // update with new state
        state.arrProduct = arrProduct;
    },

    // Get detail shoes form page hom
    getDetail: (state, action) => {
        // Get data from payload
        const productDetail = action.payload;
        // update with new state detail shoes
        state.productDetail = productDetail;
    },


    // setArrProductAction : (state,action) => {
    //     state.arrProduct = action.payload;
    // }
  }
});

export const {getProduct,getDetail, setArrProductAction} = productReducer.actions

export default productReducer.reducer

// ------------ action thunk (api) ----------------



// 1. Get all product from Api
export const getProductApi = () => {

    return async dispatch => {
        try {
            //call api
            const result = await http.get('/product');
            //Lấy dữ liệu về đưa lên redux
            const action = getProduct(result.data.content);
            dispatch(action);
        }catch(err) {
            console.log(err);
        }
    };

};

// 2. Get infor product from Api

export const getProductDetail = (id) => {
    return async dispatch => {
        try {
            // call Api 
            const result = await http.get(`/Product/getbyid?id=${id}`);

            const action = getDetail(result.data.content);
            dispatch(action);
        } catch (err) {
            console.log(err)
        }
    };
};
