import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProductApi } from '../../redux/reducers/productReducer';
import { NavLink } from "react-router-dom";
import Carousel from '../../components/Background_Carousel/BgCarousel';

export default function Home() {
  const { arrProduct } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  // Create function get all product from store
  const getAllProducts = () => {
    const actionThunk = getProductApi();
    dispatch(actionThunk);
  }

  useEffect(() => {
    getAllProducts();
  });const renderProduct = () => {
    return arrProduct.map((item, index) => {
      return (
        <div className="form_Product col-lg-4 col-12 mt-2" key={index}>
          <div className="Card_Product card shadow p-3 mb-4 bg-body rounded border-white">
            <img src={item.image} alt={item.name} />
            <div className="card-body">
              <div className="d-flex flex-column">
                <div>
                  <p className="fw-semibold">{item.name}</p>
                  <p className="fw-semibold">{item.price}$</p>
                </div>
                <NavLink className="btn btn-dark" to={`/detail/${item.id}`}>
                  View detail
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <Carousel />
      <div className="fixone ">
        <h2 className="product_feature m-4">Product Feature</h2>
        <div className="container row">{renderProduct()}</div>
      </div>
    </div>
  );
}