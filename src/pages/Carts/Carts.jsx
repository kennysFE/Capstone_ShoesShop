import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProd, increaseDecrease } from "../../redux/reducers/productReducer";

export default function Cart() {
  const { cart } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  //Xoa san pham
  const deleteProduct = (idClick) => {
    const action = deleteProd(idClick);
    dispatch(action);
  };

  //tang giam so luong
  const upDown = ({idClick,num}) => {
    const action = increaseDecrease({idClick,num})
    dispatch(action)
  }

  //map la san pham trong cart
  const renderCart = () => {
    if (cart.length === 0) {
      return (
        <tr className="table-light text-center">
          <td>__</td>
          <td>__</td>
          <td>__</td>
          <td>__</td>
          <td>__</td>
          <td>__</td>
          <td>__</td>
        </tr>
      );
    } else {
      return cart.map((prod) => {
        return (
          <tr className="table-light text-center" key={prod.id}>
            <td>{prod.id}</td>
            <td>
              <img src={prod.image} alt="" width={50} />
            </td>
            <td>{prod.name}</td>
            <td>{prod.price}</td>
            <td>
              <button className="btn btn-dark mx-2" onClick={() => {
                upDown({idClick:prod.id,num:1})
              }}>+</button>
              <span>{prod.count}</span>
              <button className="btn btn-dark mx-2" onClick={() => {
                upDown({idClick:prod.id,num:-1})
              }}>-</button>
            </td>
            <td>{prod.count * prod.price}</td>
            <td>
              <button
                className="btn btn-dark"
                onClick={() => {
                  deleteProduct(prod.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <div className="container">
      <h2 className="text-center m-4">-Carts-</h2>
      <div className="table-responsive mt-5 mb-5">
        <table
          className="table table-striped
  table-hover	
  table-borderless
  table-dark
  align-middle"
        >
          <thead className="table-light"></thead>
          <tbody>
            <tr className="text-center">
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quatity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody className="table-group-divider">
            {/* <tr className="table-light text-center">
              <td scope="row"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button className="btn btn-dark mx-2">+</button>
                <span>1</span>
                <button className="btn btn-dark mx-2">-</button>
              </td>
              <td></td>
              <td>
                <button className="btn btn-secondary me-2">Edit</button>
                <button className="btn btn-dark">Delete</button>
              </td>
            </tr> */}
            {renderCart()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
