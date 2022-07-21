import React from "react";
import { observer } from "mobx-react";

function AddToCartButton({ item, store }) {
  return <button onClick={() => store.addShopItem(item)}>+</button>;
}

function ShopItemCard({ item, store }) {
  return (
    <>
      <div key={item.id}>
        {item.name}
        <AddToCartButton store={store} item={item} />
      </div>
    </>
  );
}

function MyOpenShop({ store }) {
  return (
    <>
      {store.items.map((x) => (
        <ShopItemCard key={x.id} item={x} store={store} />
      ))}
    </>
  );
}

export default observer(MyOpenShop);
