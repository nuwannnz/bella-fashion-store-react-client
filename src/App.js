import React from 'react';

import Home from './pages/Home.js';
import ContactUs from './pages/ContactUs.js';
import NewArrivals from "./pages/NewArrivals.js";
import Categories from "./pages/Categories.js";
import SubCatgories from "./pages/SubCatgories.js";
import Error from "./pages/ErrorPage.js";

import {Route, Switch} from 'react-router-dom'


import Navbar from "./components/Navbar";


function App() {
  return (
    <>
    <Navbar />
    <Switch>
    <Route exact path="/" component = {Home}></Route>
    <Route exact path="/ContactUs/" component = {ContactUs}></Route>
    <Route exact path="/NewArrivals/" component = {NewArrivals}></Route>
    <Route exact path="/Categories/" component = {Categories}></Route>
    <Route exact path="/Categories/:SubCatgories/" component = {SubCatgories}></Route>
    <Route component = {Error} />
    </Switch>
    </>
  );
}

export default App;
