import { AiFillDelete } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { MdProductionQuantityLimits } from "react-icons/md";
import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [bolibTolash, setBolibTolash] = useState(0);
  const [tables, setTables] = useState([]);
  const {
    isEmpty,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    totalUniqueItems,
  } = useCart();
  const cartTotalPrice = cartTotal.toLocaleString();
  const handleChange = (e) => {
    setBolibTolash(e.target.value);
    let a = e.target.value;
    if (a !== 0) {
      let d = parseInt(a);
      const newData = [];
      let newPrice = cartTotal / d;
      for (let i = 1; i <= d; i++) {
        let newObj = {
          id: i,
          price: parseInt(newPrice),
        };
        newData.push(newObj);
      }
      setTables(newData);
    }
  };
  const handleProduct = (data) => {
    navigate("/getOne", { state: data });
  };
  if (isEmpty) {
    return (
      <>
        <button
          className="mb-2 mt-4 ml-4 rounded border py-1 px-2"
          onClick={() => {
            navigate("/");
          }}
        >
          <BiArrowBack size={30} />
        </button>
        <div className="flex justify-center items-center w-full min-h-[90vh]">
          <div className=" text-center">
            <h2 className="text-2xl font-medium px-10">
              Karzinkada maxsulot mavjud emas
            </h2>
            <div className="flex justify-center mt-4">
              <MdProductionQuantityLimits size={70} />
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-[95%] mt-5">
          <button
            className="mb-2 rounded border py-1 px-2"
            onClick={() => {
              navigate("/");
            }}
          >
            <BiArrowBack size={30} />
          </button>
          <h1 className="text-center text-2xl font-semibold">
            Sizning mahsulotlaringiz: ({totalUniqueItems})
          </h1>
          <div className="grid mt-7 grid-cols-1 gap-3">
            {items.map((item, index) => {
              let newPrice = item.price.toLocaleString();
              return (
                <div key={index + 1}>
                  <div className="relative rounded-md shadowCard grid grid-cols-2">
                    <img
                      src={item.img}
                      alt=""
                      className="rounded-md w-full h-48"
                    />
                    <div className="p-2 w-full">
                      <h1 className="text-base font-medium">
                        {item.title.length > 19
                          ? item.title.slice(0, 19)
                          : item.title}
                        {item.title.length > 19 && (
                          <button
                            className="font-bold text-gray-500"
                            onClick={() => handleProduct(item)}
                          >
                            ....
                          </button>
                        )}
                      </h1>
                      <h1 className="font-sans font-medium text-[15px] pt-1 w-full h-[50px]">
                        {item.desc.length > 35
                          ? item.desc.slice(0, 35)
                          : item.desc}
                        {item.desc.length > 35 && (
                          <button
                            className="font-bold font-serif text-gray-400 cursor-pointer"
                            onClick={() => handleProduct(item)}
                          >
                            ...yana
                          </button>
                        )}
                      </h1>
                      <div className="flex flex-col pt-5  justify-start">
                        <div className="flex gap-2 pt-2 items-center">
                          <button
                            className="rounded-md py-1 px-1 bg-gray-300"
                            onClick={() => {
                              updateItemQuantity(item.id, item.quantity - 1);
                            }}
                          >
                            <AiOutlineMinus size={20} />
                          </button>
                          <h1 className="text-lg font-semibold">
                            {item.quantity}
                          </h1>
                          <button
                            className="rounded-md py-1 px-1 bg-gray-300"
                            onClick={() => {
                              updateItemQuantity(item.id, item.quantity + 1);
                            }}
                          >
                            <AiOutlinePlus size={20} />
                          </button>
                        </div>
                        <p className="pt-2 font-medium">{newPrice} so'm</p>
                        <button
                          className="bg-red-500 rounded p-1 absolute bottom-2 right-2 text-white"
                          onClick={() => {
                            removeItem(item.id);
                          }}
                        >
                          <AiFillDelete size={25} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-3">
            <h1 className="text-lg font-bold">Umumiy summa:</h1>
            <h1 className="text-lg font-semibold font-mono">
              {cartTotalPrice} so'm
            </h1>
          </div>
          <div className="flex justify-between items-center mt-3">
            <h1 className="text-lg font-bold w-full">Kreditga uchun:</h1>
            <select
              name=""
              onChange={handleChange}
              value={bolibTolash}
              id=""
              className="border w-full outline-none border-gray-300 px-2 py-2 rounded-md"
            >
              <option
                className="outline-none border border-gray-400"
                selected
                value={0}
              >
                Oy tanlang
              </option>
              <option className="outline-none border border-gray-400" value={3}>
                3 oy
              </option>
              <option className="outline-none border border-gray-400" value={6}>
                6 oy
              </option>
              <option className="outline-none border border-gray-400" value={9}>
                9 oy
              </option>
              <option
                className="outline-none border border-gray-400"
                value="12"
              >
                12 oy
              </option>
            </select>
          </div>
          {tables.length > 0 ? (
            <>
              <table className="w-full mt-5 border-gray-500 border-2 rounded p-2">
                <tr className="border-gray-500 border-2">
                  <td className="text-lg font-medium text-center border-gray-500 border-2">
                    To'lovlar
                  </td>
                  <td className="text-lg font-medium text-center border-gray-500 border-2">
                    To'lovlar qiymati
                  </td>
                </tr>
                {tables.map((item, ind) => {
                  return (
                    <tr key={ind + 1} className="border-gray-500 border-2">
                      <td className="border-gray-500 border-2 pl-2">
                        {item.id}-to'lov
                      </td>
                      <td className="border-gray-500 border-2 pl-2">
                        {item.price} so'm
                      </td>
                    </tr>
                  );
                })}
              </table>
              <div className="flex  gap-3 mt-3">
                <h1 className="text-lg font-bold">Umumiy summa:</h1>
                <h1 className="text-lg font-semibold font-mono">
                  {cartTotalPrice} so'm
                </h1>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="flex mt-3 justify-center">
            <button className="bg-green-500 text-white font-semibold rounded py-2 px-4">
              Sotib olish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
