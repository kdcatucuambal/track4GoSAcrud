import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Users from "./components/user/Users";
import NewUser from "./components/user/NewUser";
import UpdateUser from "./components/user/UpdateUser";
import Header from "./components/partials/Header";
import { Provider } from "react-redux";
import store from "./store/store";



function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Users}></Route>
          <Route exact path="/newuser" component={NewUser}></Route>
          <Route exact path="/updateuser/:id" component={UpdateUser}></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
