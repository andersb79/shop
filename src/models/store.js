import User from "./User";
import { types, flow, applySnapshot } from "mobx-state-tree";

const Store = types
  .model("Store", {
    users: types.array(User),
  })
  .views((self) => ({}))
  .volatile((self) => ({
    loggedIn: null,
    initzialize: false,
    api: null,
  }))
  .actions((self) => ({
    async fetchAll() {
      var users = await self.api.getUsers();

      const data = {
        users: [],
      };

      users.forEach((elm) => {
        elm.fields.id = elm.id;
        data.users.push(elm.fields);
      });

      return data;
    },
    logout() {
      self.loggedIn = null;
    },
    login(userName, password) {
      self.loggedIn = self.users.find(
        (x) => x.userName === userName && x.password === password
      );

      if (self.loggedIn) {
        return true;
      }

      return false;
    },
    init: flow(function* init(api, id) {
      self.api = api;
      const data = yield self.fetchAll();

      applySnapshot(self, data);
      self.initzialize = true;
    }),
  }));
export default Store;
