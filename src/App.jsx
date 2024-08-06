import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Card from "./components/Card";
import { FaRegTrashCan } from "react-icons/fa6";

function App() {
  const [products, setProducts] = useState([]);
  const [checkoutPorducts, setCheckoutPorducts] = useState([]);
  const [deleteProducts, setDeleteProducts] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("./MOCK_DATA.json");
      setProducts(res.data);
    } catch (error) {
      setProducts([]);
      console.error("error", error);
    }
  };

  const handleDeleteProduct = (p) => {
    setCheckoutPorducts((prev) => prev.filter((prod) => prod.id !== p.id));
    setDeleteProducts((prev) => [...prev, p.id]);
    setProducts((prev) =>
      prev.map((prod) =>
        prod.product_id === p.id
          ? { ...prod, quantity: prod.quantity + p.qty }
          : prod
      )
    );
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
              deleteProducts={deleteProducts}
            />
          ))}
        </div>
        <div className="checkout-card w-1/3 bg-slate-500 p-4 h-screen flex flex-col justify-between">
          <div className="group">
            <h2 className="header">Checkout</h2>
            <div className="h-[calc(100vh-108px)] overflow-y-auto scrollbar">
              <ul className="flex flex-col bg-white shadow-lg rounded-lg">
                {checkoutPorducts
                  .sort((a, b) => a.id - b.id)
                  .map((product) => (
                    <li
                      key={product.id}
                      className="list p-4 flex justify-between items-center"
                    >
                      <div className="left ">
                        <p>
                          <span>({product.qty}) </span>
                          <span>{product.name}</span>
                        </p>
                        <p>{product.price}</p>
                      </div>
                      <div className="right flex items-center">
                        <p>{(product.qty * product.price).toFixed(2)}</p>
                        <button onClick={() => handleDeleteProduct(product)}>
                          <FaRegTrashCan />
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <h3 className="sub-header py-4">
            <span className="underline underline-offset-4">Grand Total:</span>
            <span className="ml-4">
              {checkoutPorducts
                .reduce(
                  (acc, cur) =>
                    Number((acc + (cur.price * cur.qty)).toFixed(2)),
                  0
                )}
              &nbsp; Baht
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default App;
