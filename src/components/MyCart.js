import React from "react";
import { observer } from "mobx-react";

function MyCart({ store }) {
  return (
    <>
      {store.cartItems.map((x) => (
        <div>
          {x.shopItem.name} - <button onClick={x.remove}>-</button> {x.count}{" "}
          <button onClick={x.add}>+</button>
        </div>
      ))}
    </>
  );
}

export default observer(MyCart);
