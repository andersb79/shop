import React, { useState } from "react";
import { observer } from "mobx-react";
import Store from "./models/store";
import Api from "./api/api";

const store = Store.create();
store.init(Api, window.localStorage.getItem("loggedIn"));

function AddToCartButton({ item }) {
  return <button onClick={() => store.addShopItem(item)}>+</button>;
}

function ShopItemCard({ item }) {
  return (
    <>
      <div>
        {item.name}
        <AddToCartButton item={item} />
      </div>
    </>
  );
}

const MyOpenShop = observer(() => {
  return (
    <>
      {store.items.map((x) => (
        <ShopItemCard key={x.id} item={x} />
      ))}
    </>
  );
});

const MyCart = observer(() => {
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
});

const App = () => {
  if (!store.initzialize) {
    return <div>:(</div>;
  }

  return (
    <div>
      <br />
      Chips
      <br />
      <MyOpenShop />
      <br />
      Min kundvagn ({store.cartCount})
      <br />
      <MyCart />
    </div>
  );
};

export default observer(App);
