import React, { useEffect, useMemo, useState } from "react";
import { TbCurrencyBaht } from "react-icons/tb";

export default function Card({
  product,
  setProducts,
  setCheckoutPorducts,
  deleteProducts,
}) {
  const [count, setCount] = useState(0);
  const orignalExstQty = useMemo(() => product.quantity, []);

  useEffect(() => {
	if (!deleteProducts.length) return
	if (deleteProducts.includes(product.product_id)){
		setCount(0)
	} 
  }, [deleteProducts]);

  const add = () => {
    if (count >= orignalExstQty || count + product.quantity !== orignalExstQty)
      return;
    setCount((prev) => prev + 1);
    setProducts((prev) =>
      prev.map((prod) =>
        prod.product_id === product.product_id
          ? { ...prod, quantity: prod.quantity - 1 }
          : prod
      )
    );
    setCheckoutPorducts((prev) =>
      prev.find((prod) => prod.id === product.product_id)
        ? prev.map((prod) =>
            prod.id === product.product_id
              ? {
                  ...prod,
                  qty: prod.qty + 1,
                }
              : prod
          )
        : [
            ...prev,
            {
              id: product.product_id,
              name: product.product_name,
              qty: 1,
              price: product.price,
            },
          ]
    );
  };
  const remove = () => {
    if (count <= 0 || count + product.quantity !== orignalExstQty) return;
    setCount((prev) => prev - 1);
    setProducts((prev) =>
      prev.map((prod) =>
        prod.product_id === product.product_id
          ? { ...prod, quantity: prod.quantity + 1 }
          : prod
      )
    );
    setCheckoutPorducts((prev) => {
      const target = prev.find((prod) => prod.id === product.product_id);
      if (!target) return prev;
      if (target.qty > 1) {
        return prev.map((prod) =>
          prod.id === product.product_id
            ? {
                ...prod,
                qty: prod.qty - 1,
              }
            : prod
        );
      } else {
        return prev.filter((prod) => prod.id !== product.product_id);
      }
    });
  };

  return (
    <div className="card shadow-lg p-4 rounded-lg">
      <div className="row">
        <p className="font-bold text-sky-500">{product.product_name}</p>
        <p>Exist Qty.: {product.quantity}</p>
      </div>
      <div className="row">
        <p className="flex items-center gap-1 font-bold text-gray-600">
          {product.price} <TbCurrencyBaht className="text-gray-400" />
        </p>
        <p className="counter">
          <button
            onClick={remove}
            disabled={count <= 0 ? true : false}
            className={
              count <= 0
                ? "bg-gray-400 text-gray-50"
                : "bg-sky-700 text-sky-400"
            }
          >
            -
          </button>
          <span>{count}</span>
          <button
            onClick={add}
            disabled={product.quantity <= 0 ? true : false}
            className={
              product.quantity <= 0
                ? "bg-gray-400 text-gray-50"
                : "bg-fuchsia-700 text-fuchsia-400"
            }
          >
            +
          </button>
        </p>
      </div>
    </div>
  );
}
