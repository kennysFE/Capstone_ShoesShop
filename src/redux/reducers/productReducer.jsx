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

    // Add Card
    addProd: (state, action) => {
        // get data from payload
        let prod = action.payload;

        // variable get all card from 
        let cardUpdata = [...state.card];

        prod = { ...prod, count: 1};
        let sp = cardUpdata.find((p) => p.id === prod.id);
        if (sp) {
            sp.count += 1;
        }else {
            cardUpdata.push(prod);
        }
        state.card = cardUpdata;
    },
    // Delete card 
    deleteProd: (state, action) => {
        let delProdId = action.payload;
        let cardUpdate = [...state.card]
        cardUpdate = cardUpdate.filter((sp) => sp.id !== delProdId);
        state.card = cardUpdate;
    },

    // Decrease and Increase quanlity
    increaseDecrease:  (state, action) => {
        let {idClick, num } = action.payload;
        let cardUpdate = [...state.card];
        let sp = cardUpdate.find(sp => sp.id === idClick);
        if (sp) {
            sp.count += num;
            if (sp.count < 1) {
                if (window.confirm('Delete card from shopping card')){
                    cardUpdate = cardUpdate.filter((sp) => sp.id !== idClick)
                }else {
                    sp.count -= num;
                }
            }
        }
        state.card = cardUpdate;
    }
  }
});

export const {getProduct,getDetail, addProd, deleteProd, increaseDecrease} = productReducer.actions

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
