import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Destination from './components/Destination/Destination';
import RideDetail from './components/RideDetail/RideDetail';



export const UserContext = createContext();

function App() {
const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
    <Router>
          <Header/>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/ridedetail/:id">
              <RideDetail></RideDetail>
            </Route>
            <PrivateRoute path="/destination/:name">
              <Destination></Destination>
            </PrivateRoute>
          </Switch>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
