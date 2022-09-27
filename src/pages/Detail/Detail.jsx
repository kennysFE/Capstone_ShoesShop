import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { addProd, getProductDetail } from "../../redux/reducers/productReducer";
// import { renderHeart} from "../Home/Home"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Detail() {
  // Create useState size and quantity
  const [sizeState, setSizeState] = useState("36");
  const [quantityState, setQuantityState] = useState(1);

  // changde state size shoes 
  const renderProductSize = (listSize) => {
    return listSize.map((size, index) => {
      return (
        <div key={index}>
          <div
            className={"size-num " + (sizeState === size ? "active-size":"")}
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


  const { productDetail } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  const params = useParams();

  // Add cart on shopping cart
  const addToCart = (prod) => {
    const action = addProd(prod);
    dispatch(action);
  };

  const getProductDetailApi = () => {
    let { id } = params;
    const action = getProductDetail(id);
    dispatch(action);
  };
  // Render size
  //render size giay
  // const renderSize = () => {
  //   return productDetail.size?.map((n, index) => {
  //     return (
  //       <option value={n} key={index}>{n}
  //       </option>
  //     );
  //   });
  // };

  //render lai trang moi lan them san pham moi
  useEffect(() => {
    getProductDetailApi();
    window.scrollTo(0, 10);
  }, [params.id]);

  // Render icon heart
  const renderHeart = () => {
    return (
      <>
        <FontAwesomeIcon icon="fa-solid fa-heart" className="heart" />
      </>
    );
  };  

  return (
    <div className="container">
      <div className="row mt-5 justify-content-between">
        <div className="col-lg-4 col-12">
          <img
            className="w-100"
            src={productDetail.image}
            alt={productDetail.name}
          />
        </div>
        <div className="col-lg-6 col-12">
          <div className="row mb-3 ">
            <h4 className="col-lg-9 col-12">{productDetail.name}</h4>
              {/* <p className="col-lg-2 col-12 fw-semibold fs-5">
                {productDetail.price}$
              </p> */}
          </div>
          <p className="mb-4">{productDetail.description}</p>
          <div className="size" id="size-list">
              {productDetail.size ? (
                renderProductSize(productDetail.size)
              ) : (
                <></>
              )}
            </div>
            <p className="card_price_detail col-12 fs-5">
              {productDetail.price}$
            </p>
          {/* <select className="form-select" aria-label="Default select example">
            <option selected>Select Size</option>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            {renderSize()}
          </select> */}
          <div className="mt-3">
            <button className="gain btn btn-light me-2" onClick={() => {

            }}>+</button>
            <span>{quantityState}</span>
            <button className="gain btn btn-light ms-2">-</button>
          </div>
          <button
            className="addToCart btn btn-dark mt-3"
            onClick={() => {
              addToCart(productDetail);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <h3 className="text-center m-4">-Related Product-</h3>
      <div className="row mt-2">
        {/*toán tử ?: optional chaining */}
        {productDetail.relatedProducts?.map((item, index) => {
          console.log(productDetail.relatedProducts[index].id);
          return (
            // <div className="col-4 mt-2 " key={index}>
            //   <div className="card shadow p-3 mb-5 bg-body rounded border-white">
            //     <img src={item.image} alt={item.name} />
            //     <div className="card-body">
            //       <div className="d-flex flex-column">
            //         <div>
            //           <p className="fw-semibold">{item.name}</p>
            //           <p className="fw-semibold">{item.price}$</p>
            //         </div>
            //         <NavLink className="btn btn-dark" to={`/detail/${item.id}`}>
            //           View detail
            //         </NavLink>
            //       </div>
            //     </div>
            //   </div>
            // </div>
            <div className="form_Product col-lg-4 col-12 mt-2" key={index}>
          <div className="Card_Product card shadow bg-body rounded border-white">
            {renderHeart()}
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
        })}
      </div>
    </div>
  );
}
