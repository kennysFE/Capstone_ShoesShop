import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProductApi } from '../../redux/reducers/productReducer';
import { NavLink } from "react-router-dom";
import Carousel from '../../components/Background_Carousel/BgCarousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home() {
  const { arrProduct } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  // Create function get all product from store
  const getAllProducts = () => {
    const actionThunk = getProductApi();
    dispatch(actionThunk);
  }

  const renderHeart = () => {
    return (
      <>
        <FontAwesomeIcon icon="fa-solid fa-heart" className="heart" />
      </>
    );
  };

  useEffect(() => {
    getAllProducts();
  });
  
  const renderProduct = () => {
    return arrProduct.map((item, index) => {
      return (
        <div className="form_Product col-lg-4 col-12 mt-2" key={index}>
          <div className="Card_Product card shadow bg-body rounded border-white">{renderHeart()}
            <img src={item.image} alt={item.name} />
            <div className="card-body">
              <div className="card_infor d-flex flex-column">
                <div>
                  <p className="card_name">{item.name}</p>
                  <p className="card_des fw-semibold">{item.description}</p>
                </div>
              </div>
            </div>
                <div className='d-flex'>
                <NavLink className="card_detail flex-fill btn btn-dark" to={`/detail/${item.id}`}>
                  Buy now
                </NavLink>
                <p className="card_price p-2 flex-fill">{item.price}$</p>
                </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <Carousel />
        <h2 className="product_feature">Product Feature</h2>
        <div className="fixone ">
        <div className="container row">{renderProduct()}</div>
      </div>
    </div>
  );
}