import React from "react";
import {Route, BrowserRouter as Router} from "react-router-dom";
import Products from "./productList";
import Form from "./form";
import Nav from "./nav";
import Cart from "./cart";
import Login from "./login";


export default function AppRoute() {

    return (
        <>
            <Router>

            <Nav />

            <Route path="/products" exact component={Products} />
            <Route path="/form" exact component={Form} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/login" exact component={Login} />
            
            

            </Router>
            
        </>
    )
}