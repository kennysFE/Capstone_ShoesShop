import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import { getProfileApi } from "./userReducer";
import { http } from "../../util/config";

const initialState = {
  arrProduct: [],
  productDetail: {},
  cart: [],
  // cart: []

};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    //lay all product
    getProduct: (state, action) => {
      //lay du lieu tu payload
      const arrProduct = action.payload;
      // cap nhat lai state
      state.arrProduct = arrProduct;
    },
    //lay detail
    getDetail: (state, action) => {
      //buoc 4: Sau khi nhan duoc du lieu tu dispatch 2
      const productDetail = action.payload;
      state.productDetail = productDetail;
    },
    // //them vao cart
    // addProd: (state, action) => {
    //   let prod = action.payload;
    //   let cartUpdate = [...state.cart];
    //   prod = { ...prod, count:1 };
    //   let sp = cartUpdate.find((p) => p.id === prod.id);
    //   if (sp) {
    //     sp.count += 1;
    //   } else {
    //     cartUpdate.push(prod);
    //   }

    //   state.cart = cartUpdate;      
    // },
    // //xoa khoi cart
    // deleteProd: (state, action) => {
    //   let delProdId = action.payload;
    //   let cartUpdate = [...state.cart];
    //   cartUpdate = cartUpdate.filter((sp) => sp.id !== delProdId);
    //   state.cart = cartUpdate;
    // },
    // //tang giam so luong
    // increaseDecrease: (state, action) => {
    //   let { idClick, num } = action.payload;
    //   //console.log({ idClick, num });
    //   let cartUpdate = [...state.cart]
    //   let sp =cartUpdate.find(sp => sp.id === idClick)
    //   if(sp){
    //     sp.count += num
    //     if(sp.count < 1){
    //       if(window.confirm('Xóa khỏi giỏ hàng')){
    //         cartUpdate = cartUpdate.filter(sp => sp.id !== idClick)
    //       }else {
    //         sp.count -= num
    //       }
    //     }
    //   }
    //   state.cart = cartUpdate
    // },

    addToCart: (state, action) => {
      let index = state.cart.findIndex(
        (i) => i.id === action.payload.id
      );
      if (index === -1) {
        state.cart.push(action.payload);
      } else {
        state.cart[index].quantityState += action.payload.quantityState;
      }
    },
    clearListCartTempAction: (state, action) => {
      state.cart = [];
    },
    changeQuantity: (state, action) => {
      console.log("action", action.payload);
      let index = state.cart.findIndex(
        (i) => i.id === action.payload[1]
      );
      if (index !== -1) {
        state.cart[index].quantityState += action.payload[0];
      }
    },
    DeleteCartAction: (state, action) => {
      let newcart = state.cart.filter(
        (i) => i.id !== action.payload
      );
      state.cart = newcart;
    },

    submitOrderCart: (state, action) => {
      let newcart = [...state.cart];
      console.log(action.payload.orderDetail);
      action.payload.orderDetail.forEach((i, index) => {
        newcart = newcart.filter((j) => j.id !== i.productId);
      });
      console.log("newcart", newcart);
      state.cart = newcart;
    },

  },
});

export const { getProduct, getDetail, addToCart, clearListCartTempAction, changeQuantity, DeleteCartAction, submitOrderCart } =
  productReducer.actions;

export default productReducer.reducer;

export const getProductApi = () => {
  return async (dispatch) => {
    try {
      const result = await http.get('/Product')
      //sau khi lay du lieu tu api ve thi set State
      //setArrProduct(result.data.content);
      const action = getProduct(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProductDetail = (id) => {
  return async (dispatch) => {
    //Buoc 2: Thuc thi thunk
    try {
      let result = await http.get(`/Product/getbyid?id=${id}`);
      //Buoc 3: Sau khi co du lieu dispatch lan 2
      const action = getDetail(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const postOrderProductApi = (order) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/Users/order", order);
      console.log(result);
      alert("Đặt hàng thành công!");
      dispatch(submitOrderCart(order));
      dispatch(getProfileApi());
    } catch (err) {
      console.log(err);
    }
  };
};
