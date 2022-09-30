import React, { useState } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import {
  changeQuantity,
  DeleteCartAction,
} from "../../redux/reducers/productReducer";
import { useDispatch } from "react-redux";
import { postOrderProductApi } from "../../redux/reducers/productReducer";
import { history } from "../../index";

export default function Cart() {
  const { cart } = useSelector((state) => state.productReducer);
  const { userLogin } = useSelector((state) => state.userReducer);
  const [cartlist, setcartlist] = useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "image",
      dataIndex: "image",
      render: (image) => (
        <img src={image} alt="Favorite" width={70} height={65} />
      ),
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "price",
      dataIndex: "price",
    },
    {
      title: "quantity",
      dataIndex: "quantityState",
      render: (quantityState, obj) => {
        return (
          <div>
            <button
              className="btn-1 mx-4"
              onClick={() => {
                handleChangeQuantity(+1, obj.id);
              }}
            >
              +
            </button>
            <span className="span-quantity py-2 px-5">{quantityState}</span>
            <button
              className="btn-1 mx-4"
              onClick={() => {
                if (quantityState <= 1) {
                  if (window.confirm(`Bạn có muốn xóa sản phẩm ${obj.name}`)) {
                    handleDelete(obj.id);
                  }
                } else {
                  handleChangeQuantity(-1, obj.id);
                }
              }}
            >
              -
            </button>
          </div>
        );
      },
    },
    {
      title: "total",
      dataIndex: "total",
    },
    {
      title: "action",
      dataIndex: "action",
      render: (id, obj) => {
        return (
          <div>
            <button className="btn-edit mx-3">EDIT</button>
            <button
              className="btn-delete mx-3"
              onClick={() => {
                if (window.confirm(`Bạn có muốn xóa sản phẩm ${obj.name}`)) {
                  handleDelete(id);
                }
              }}
            >
              DELETE
            </button>
          </div>
        );
      },
    },
  ];
  //dummy data
  const data = [];

  console.log(cart);
  for (let i = 0; i < cart.length; i++) {
    data.push({
      key: i,
      id: cart[i].id,
      name: cart[i].name,
      image: cart[i].image,
      price: cart[i].price,
      quantityState: cart[i].quantityState,
      total: cart[i].price * cart[i].quantityState,
      action: cart[i].id,
    });
  }
  console.log("data", data);

  const onSelectChange = (newcartlist) => {
    setcartlist(newcartlist);
    // console.log("cartlist changed: ", cartlist);
  };

  const rowSelection = {
    cartlist,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newcartlist = [];
          newcartlist = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }

            return true;
          });
          setcartlist(newcartlist);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newcartlist = [];
          newcartlist = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }

            return false;
          });
          setcartlist(newcartlist);
        },
      },
    ],
  };
  let handleChangeQuantity = (number, id) => {
    // console.log(number, id);
    dispatch(changeQuantity([number, id]));
  };
  let handleDelete = (id) => {
    console.log(id);
    dispatch(DeleteCartAction(id));
  };

  const handleSubmitOrder = () => {
    if (cart.length === 0) {
      history.push("/home");
      return alert("Vui lòng chọn sản phẩm cần đặt hàng!");
    }
    let orderDetail = [];
    cartlist.forEach((i, index) => {
      orderDetail.push({
        productId: cart[i].id,
        quantity: cart[i].quantityState,
      });
    });
    let { email } = userLogin;
    let order = { orderDetail, email };
    console.log(order);
    if (orderDetail.length === 0) {
      return alert("Vui lòng chọn sản phẩm cần đặt hàng");
    }
    dispatch(postOrderProductApi(order, cart));
  };
  return (
    <>
      <section className="cart">
        <div className="container">
          <h3>Carts</h3>
          <div className="cart-table">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
            />
            <button className="btn-submit-order" onClick={handleSubmitOrder}>
              SUBMIT ORDER
            </button>
          </div>
        </div>
      </section>
    </>
  );
}