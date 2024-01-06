import React, { useEffect, useState } from "react";
import { MdShoppingCartCheckout } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useCart } from "react-use-cart";

const url = "http://localhost:4000/products";
function GetOne() {
  const { state } = useLocation();
  const { totalItems, items, addItem, removeItem } = useCart();
  const [getOne, setGetOne] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (state) {
      // axios
      //   .get(`${url}/${state}`)
      //   .then((res) => {
      //     setGetOne([res.data]);
      //   })
      //   .catch((err) => console.log(err));
      setGetOne([state]);
    }
  }, []);
  const handleBack = (data) => {
    getOne[0].status = false;
    let newObj = getOne[0];
    getOne.splice(0, 1, newObj);
    setGetOne([...getOne]);
    removeItem(data.id);
  };
  const handleAdd = (data) => {
    getOne[0].status = true;
    let newObj = getOne[0];
    getOne.splice(0, 1, newObj);
    setGetOne([...getOne]);
    addItem(data);
  };
  return (
    <div>
      <div className="flex justify-center relative">
        <div className="mt-4 w-[95%]">
          <button
            className="mb-4 rounded border py-1 px-2"
            onClick={() => {
              navigate("/");
            }}
          >
            <BiArrowBack size={30} />
          </button>
          {state ? (
            <>
              {getOne.map((item) => (
                <div key={item.id}>
                  <img
                    src={item.img}
                    className="w-full max-h-60 object-cover bg-cover"
                    alt=""
                  />
                  <h1 className="text-lg mt-3 font-semibold">
                    Nomi: {item.title}
                  </h1>
                  <div className="flex mt-2 justify-between">
                    <h1 className="text-lg font-bold">Narxi:</h1>
                    <h1 className="text-lg font-mono font-medium">
                      {item.price} so'm
                    </h1>
                  </div>
                  <div className="flex mt-2 justify-between">
                    <h1 className="text-lg font-bold">Kategoriyasi:</h1>
                    <h1 className="text-lg font-mono font-medium">
                      {item.category.title}
                    </h1>
                  </div>
                  <h1 className="text-base mt-2 font-medium font-serif tracking-wider">
                    <span className="font-semibold">Malumot:</span> {item.desc}
                  </h1>
                  <div className="flex justify-center mt-4">
                    {item.status ? (
                      <button
                        className="bg-gray-500 text-white rounded py-1 px-5"
                        onClick={() => handleBack(item)}
                      >
                        <MdOutlineRemoveShoppingCart size={27} />
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white rounded py-1 px-5"
                        onClick={() => handleAdd(item)}
                      >
                        <MdOutlineShoppingCartCheckout size={27} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {totalItems > 0 ? (
        <div className="fixed bottom-5 right-6">
          <button
            className="shopBtn relative text-white rounded-full py-6 px-6"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <MdShoppingCartCheckout size={30} />
            <span className="absolute top-2 font-semibold font-sans text-lg right-2 bg-white text-green-600 rounded-full w-8 h-7">
              {totalItems}
            </span>
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default GetOne;
