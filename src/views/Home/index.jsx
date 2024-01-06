import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsFilterCircle } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { MdShoppingCartCheckout } from "react-icons/md";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";
import data from "./data";

// const url = "http://localhost:4000/products";
// const urlCategory = "http://localhost:4000/categories";
const categoryData = [
  {
    id: 1,
    title: "Samartfonlar",
    img: "https://avatars.mds.yandex.net/i?id=d09a48eb6e5aef81f608b3af8ada3124ae375ea3-8276139-images-thumbs&n=13",
  },
  {
    id: 12,
    title: "Televizor",
    img: "https://avatars.mds.yandex.net/i?id=5ed5082144ae230c719cf3a31edfdc08_sr-5219471-images-thumbs&n=13",
  },
  {
    id: 13,
    title: "Kompyuterlar",
    img: "https://avatars.mds.yandex.net/i?id=21fab80e39fd2556665218e685b6dd47_sr-5888192-images-thumbs&n=13",
  },
  {
    id: 14,
    title: "Maishiy texnika",
    img: "https://avatars.mds.yandex.net/i?id=cd805077d52f626405dced952558858f_sr-5714836-images-thumbs&n=13",
  },
];

function Home() {
  const navigate = useNavigate();
  const { totalItems, items, addItem, removeItem } = useCart();
  const [category, setCategory] = useState("");
  const [productData, setProductData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setProductData(data);
    setFilterProduct(data);
    setCategories(categoryData);
    // axios
    //   .get(url)
    //   .then((res) => {
    //     setProductData(res.data);
    //     setFilterProduct(res.data);
    //   })
    //   .catch((err) => console.log(err));
    // axios
    //   .get(urlCategory)
    //   .then((res) => {
    //     setCategories(res.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  const handleChange = (elem) => {
    setCategory(elem.title);
    if (elem.title === "") {
      setProductData(filterProduct);
    } else {
      let data = filterProduct.filter((item) => {
        return item.category.title === elem.title;
      });
      setProductData(data);
    }
    setOpen(false);
  };
  const handleBackCart = (data, index) => {
    let filterData = productData.filter((elem) => elem.id == data.id);
    filterData[0].status = false;
    let newObj = filterData[0];
    productData.splice(index, 1, newObj);
    setProductData([...productData]);
    removeItem(data.id);
  };
  const handleAddCart = (data, index) => {
    let filterData = productData.filter((elem) => elem.id == data.id);
    filterData[0].status = true;
    let newObj = filterData[0];
    productData.splice(index, 1, newObj);
    setProductData([...productData]);
    addItem(data);
  };
  const handleProduct = (data) => {
    navigate("/getOne", { state: data });
  };
  return (
    <div>
      <div className="flex justify-center relative">
        <div className="w-[95%] mt-5">
          <h1 className="text-center pb-5 text-2xl font-serif font-semibold">
            Mahsulotlar
          </h1>
          <div className="flex justify-between">
            {/* <select
              name=""
              value={category}
              id=""
              onChange={handleChange}
              className="border w-full outline-none border-gray-300 px-2 py-2 rounded-md"
            >
              <option value="">All</option>
              {categories.map((item, index) => {
                return (
                  <option
                    key={index + 1}
                    value={item.title}
                    className="outline-none border border-gray-400"
                  >
                    {item.title}
                  </option>
                );
              })}
            </select> */}
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Qidiruv..."
                className="p-2 w-full rounded-s-md pl-3 outline-none bg-gray-100 font-medium"
              />
              <button className="bg-none outline-none rounded-e-md px-4 bg-gray-300 h-full">
                <BsSearch />
              </button>
            </div>
            <button
              className="px-5"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <BsFilterCircle size={22} />
            </button>
          </div>
          {open ? (
            <div className="fixed z-50 top-0 left-0 w-full h-screen flex justify-center items-center bg-[#000000ab]">
              <div className="bg-white rounded-md p-2 relative max-w-md w-80">
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <AiOutlineCloseCircle size={23} />
                  </button>
                </div>
                <h1 className="text-center text-2xl font-medium">
                  Kategoriyalar
                </h1>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="" onClick={() => handleChange({ title: "" })}>
                    <div
                      className="bg-cover bg-no-repeat h-[15vh] rounded-md w-full bg-[image:var(--image-url)]"
                      style={{
                        "--image-url": `url(https://avatars.mds.yandex.net/i?id=d8711dea691fe28385f70d9f517abe9e_sr-5476313-images-thumbs&n=13)`,
                      }}
                    >
                      <div className="w-full h-full flex justify-center rounded-md items-center text-white bg-[#00000097]">
                        <h1 className="text-xl font-medium font-serif">
                          Hammasi
                        </h1>
                      </div>
                    </div>
                  </div>
                  {categories.map((item) => (
                    <div
                      className=""
                      key={item.id}
                      onClick={() => handleChange(item)}
                    >
                      <div
                        className="bg-cover bg-no-repeat h-[15vh] rounded-md w-full bg-[image:var(--image-url)]"
                        style={{ "--image-url": `url(${item.img})` }}
                      >
                        <div className="w-full h-full flex justify-center rounded-md items-center text-white bg-[#00000097]">
                          <h1 className="text-xl font-medium font-serif">
                            {item.title}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="grid grid-cols-2 mt-7 gap-3">
            {productData.map((item, index) => {
              const priceNew = item.price.toLocaleString();
              return (
                <div key={index + 1}>
                  <div className="rounded-md h-[400px] shadow-md">
                    <div className="relative">
                      <img
                        onClick={() => handleProduct(item)}
                        src={item.img}
                        className="w-full bg-cover bg-center object-cover h-40 rounded-md"
                        alt=""
                      />
                      {item.prodStatus !== undefined ? (
                        <div
                          className={`absolute top-0 left-0 ${
                            item.prodStatus == 0
                              ? "bg-green-400 text-white text-sm font-medium rounded-ss-md rounded-ee-md py-1 px-1"
                              : item.prodStatus == 1
                              ? "bg-purple-400 text-white text-sm font-medium rounded-ss-md rounded-ee-md py-1 px-1"
                              : "bg-orange-400 text-white text-sm font-medium rounded-ss-md rounded-ee-md py-1 px-1"
                          }`}
                        >
                          {item.prodStatus == 0
                            ? "Bepul yetkazish"
                            : item.prodStatus == 1
                            ? "Yangi"
                            : "Bo'lib to'lash"}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="p-2">
                      <h1 className="text-sm font-semibold h-[40px] font-serif tracking-wide">
                        {item.title.length > 28
                          ? item.title.slice(0, 28)
                          : item.title}
                        {item.title.length > 28 && (
                          <button
                            className="font-bold text-gray-400 cursor-pointer"
                            onClick={() => handleProduct(item)}
                          >
                            ...yana
                          </button>
                        )}
                      </h1>
                      <div className="flex flex-col sm:justify-between pt-1">
                        <p className="text-sm font-bold">Narxi:</p>
                        <p className="text-sm font-serif font-semibold">
                          {priceNew} so'm
                        </p>
                      </div>
                      <h1 className="font-sans font-medium text-[15px] pt-1 w-full h-[75px]">
                        {item.desc.length > 40
                          ? item.desc.slice(0, 40)
                          : item.desc}
                        {item.desc.length > 40 && (
                          <button
                            className="font-bold font-serif text-gray-400 cursor-pointer"
                            onClick={() => handleProduct(item)}
                          >
                            ...yana
                          </button>
                        )}
                      </h1>
                      <div className="pt-2 flex justify-center">
                        {item.status ? (
                          <button
                            className="bg-gray-500 text-white rounded py-1 px-5"
                            onClick={() => handleBackCart(item, index)}
                          >
                            <MdOutlineRemoveShoppingCart size={27} />
                          </button>
                        ) : (
                          <button
                            className="bg-green-500 text-white rounded py-1 px-5"
                            onClick={() => handleAddCart(item, index)}
                          >
                            <MdOutlineShoppingCartCheckout size={27} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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

export default Home;
