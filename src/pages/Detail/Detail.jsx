import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { addProd, addToCart, getProductApi, getProductDetail } from "../../redux/reducers/productReducer";
// import { renderHeart} from "../Home/Home"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getStore, USER_LOGIN } from "../../util/config";
import { getProfileApi } from "../../redux/reducers/userReducer";

export default function Detail() {
  // Create useState size and quantity
  const [sizeState, setSizeState] = useState("36");
  const [quantityState, setQuantityState] = useState(1);
  const param = useParams();
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.productReducer);
  

  useEffect(() => {
    let { id } = param;
    dispatch(getProductDetail(id));
  }, [param.id]);

  const renderProductDetail = (productDetail) => {
    if (!productDetail) {
      return <></>;
    }
    return (
      <>
        <div className="col-left">
          <div className="detail-left">
            <img src={productDetail.image} alt="..." />
          </div>
        </div>
        <div className="col-right">
          <div className="detail-right">
            <h3>{productDetail.name}</h3>
            <p>{productDetail.description}</p>
            <span>Avaiable size</span>
            <div className="size" id="size-list">
              {productDetail.size ? (
                renderProductSize(productDetail.size)
              ) : (
                <></>
              )}
            </div>
            <h1>{productDetail.price}$</h1>
            <div className="changeSize">
              <div
                className="enhance"
                onClick={() => {
                  handleChangeQuantity(1);
                }}
              >
                <p>+</p>
              </div>
              <p>{quantityState}</p>
              <div
                className="enhance"
                onClick={() => {
                  handleChangeQuantity(-1);
                }}
              >
                <p>-</p>
              </div>
            </div>
            <button className="addBTN" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </>
    );
  };

  const handleAddToCart = () => {
    if (!getStore(USER_LOGIN)) {
      dispatch(getProfileApi());
    }
    dispatch(addToCart({ ...productDetail, sizeState, quantityState }));
  };

  const handleChangeQuantity = (number) => {
    if (quantityState < 2 && number === -1) {
      return alert("Không thể chỉnh số lượng dưới 1");
    }
    setQuantityState(quantityState + number);
  };

  const renderProductSize = (listSize) => {
    return listSize.map((size, index) => {
      return (
        <div key={index}>
          <div
            className={"size-num " + (sizeState === size ? "active-size" : "")}
            onClick={() => {
              handleChangeSize(size);
            }}
          >
            <p className={sizeState === size ? "active-size" : ""}>{size}</p>
          </div>
        </div>
      );
    });
  };

  const handleChangeSize = (size) => {
    setSizeState(size);
  };

  const renderRelateProduct = (relatedList) => {
    return relatedList.map((item, index) => {
      return (
        <div className="col item" key={index}>
          <div
            className="card mx-auto mt-lg-5 mt-md-4 mt-sm-2"
          >
            <img
              src={item.image}
              alt="..."
              className="m-auto mt-4"
              width="240px"
            />
            {renderHeart()}
            <div className="card-body">
              <h5 className="card_name_detail">{item.name}</h5>
              <p className="card-text">
                {item.description.length > 30
                  ? `${item.description.substring(0, 30)}...`
                  : item.description}
              </p>
            </div>
            <div className="card_infor p-0" style={{ height: 64 }}>
              <div className="card_infor-detail d-flex justify-content-center align-items-center text-center h-100">
                <div
                  className="card_infor-buynow d-flex justify-content-center align-items-center col h-100"
                >
                  <NavLink
                    to={`/detail/${item.id}`}
                    className="card_buy"
                  >
                    Buy now
                  </NavLink>
                </div>
                <div
                  className="card_infor-price d-flex justify-content-center align-items-center col h-100"
                  
                >
                  <p
                    className="card_price-number m-0"
                    
                  >
                    {item.price}$
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderHeart = () => {
    return (
      <>
        <FontAwesomeIcon icon="fa-solid fa-heart" className="heart" />
      </>
    );
  };

  return (
    <div>
      <div>
        <section className="detail">
          <div className="container">
            <div className="row-detail" id="item-detail">
              {renderProductDetail(productDetail)}
            </div>
          </div>
        </section>
        <section className="product mb-lg-5 mb-md-4 mb-sm-2">
          <div className="container">
            <h2 className="text-center">- Relate Product -</h2>
            <div className="row" id="product-row">
              {productDetail.relatedProducts ? (
                renderRelateProduct(productDetail.relatedProducts)
              ) : (
                <></>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
