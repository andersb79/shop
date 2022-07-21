import React, { useState } from "react";
import { observer } from "mobx-react";
import Store from "./models/store";
import Api from "./api/api";
import MyOpenShop from "./components/ShopItemCard";
import MyCart from "./components/MyCart";

export const store = Store.create();
store.init(Api, window.localStorage.getItem("loggedIn"));

const App = () => {
  if (!store.initzialize) {
    return <div>:(</div>;
  }

  return (
    <div>
      <br />
      Skor
      <br />
      <MyOpenShop store={store} />
      <br />
      Min kundvagn ({store.cartCount})
      <br />
      <MyCart store={store} />
    </div>
  );
};

export default observer(App);
