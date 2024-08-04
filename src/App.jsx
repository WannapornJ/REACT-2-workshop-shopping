import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Card from "./components/Card";
import { FaRegTrashCan } from "react-icons/fa6";

function App() {
  const [products, setProducts] = useState([]);
  const [checkoutPorducts, setCheckoutPorducts] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("./MOCK_DATA.json");
      setProducts(res.data);
    } catch (error) {
      setProducts([]);
      console.error("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="scrollbar">
      <div className="flex w-11/12 lg:w-3/5 m-auto">
        <div className="product-card w-2/3 p-4 h-screen overflow-y-auto scrollbar">
          <h2 className="header">All Porducts</h2>
          {products.map((product) => (
            <Card
              key={product.product_id}
              product={product}
              setProducts={setProducts}
              setCheckoutPorducts={setCheckoutPorducts}
            />
          ))}
        </div>
        <div className="checkout-card w-1/3 bg-slate-500 p-4 h-screen flex flex-col justify-between">
          <div className="group">
            <h2 className="header">Checkout</h2>
            <div className="h-[calc(100vh-108px)] overflow-y-auto scrollbar">
              {checkoutPorducts.sort((a, b) => a.id - b.id).map((product) => (
                <div className="list bg-white shadow-lg p-4 flex justify-between items-center">
                  <div className="left ">
                    <p>
                      <span>({product.qty}) </span>
                      <span>{product.name}</span>
                    </p>
                    <p>{product.price}</p>
                  </div>
                  <div className="right flex items-center">
                    <p>{(product.qty * product.price).toFixed(2)}</p>
                    <button>
                      <FaRegTrashCan />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <h3 className="sub-header py-4">
            <span className="underline underline-offset-4">Grand Total:</span>
            <span className="ml-4">
              {checkoutPorducts
                .map((product) =>
                  Number((product.price * product.qty).toFixed(2))
                )
                .reduce((acc, cur) => Number((acc + cur).toFixed(2)), 0)}
              &nbsp; Baht
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default App;
