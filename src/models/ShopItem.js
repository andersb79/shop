import { types, getRoot } from "mobx-state-tree";

const ShopItem = types
  .model("ShopItem", {
    id: types.string,
    name: types.string,
  })
  .views((self) => ({
    get firstName() {
      return self.name.split(" ")[0];
    },
  }))
  .actions((self) => ({}));

export default ShopItem;
