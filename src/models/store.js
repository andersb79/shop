import ShopItem from "./ShopItem";
import CartItem from "./CartItem";
import { types, flow, applySnapshot } from "mobx-state-tree";

const Store = types
  .model("Store", {
    items: types.array(ShopItem),
    cartItems: types.array(CartItem, []),
  })
  .volatile((self) => ({
    initzialize: false,
    api: null,
  }))
  .views((self) => ({
    get cartCount() {
      return self.cartItems === null ? 0 : self.cartItems.length;
    },
  }))
  .actions((self) => {
    return {
      async fetchAll() {
        var items = await self.api.getShopItems();

        const data = {
          items: [],
        };

        items.forEach((elm) => {
          elm.fields.id = elm.id;
          data.items.push(elm.fields);
        });

        return data;
      },
      removeCartItem(item) {
        self.cartItems.remove(item);
      },
      addShopItem(item) {
        let cartItem = self.cartItems.find((x) => x.id === item.id);

        if (cartItem) {
          cartItem.add();
          return;
        }

        cartItem = CartItem.create({ id: item.id, count: 1 });
        self.cartItems.push(cartItem);
      },
      init: flow(function* init(api, id) {
        self.api = api;
        const data = yield self.fetchAll();

        applySnapshot(self, data);
        self.initzialize = true;
      }),
    };
  });

export default Store;
