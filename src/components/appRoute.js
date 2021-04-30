import React from "react";
import {Route, BrowserRouter as Router} from "react-router-dom";
import Products from "./productList";
import Form from "./form";
import Nav from "./nav";
import Cart from "./cart";
import Login from "./login";
import Register from "./register";
import Message from "./message";


export default function AppRoute() {

    return (
        <>
            <Router>

            <Nav />
            {/* <Menu/> */}

            <Route path="/products" exact component={Products} />
            <Route path="/form" exact component={Form} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/message" exact component={Message}/>
            
            

            </Router>
            
        </>
    )
}