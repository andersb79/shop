import "./App.css";
import { observer } from "mobx-react-lite";

import Store from "./models/store";
import Api from "./api/api";

const store = Store.create();
store.init(Api, window.localStorage.getItem("loggedIn"));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {store.initzialize && store.users.map((x) => <div>{x.name}</div>)}
        {!store.initzialize && <div>:(</div>}
      </header>
    </div>
  );
}

export default observer(App);
