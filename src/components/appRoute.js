import React from "react";
import {Route, BrowserRouter as Router} from "react-router-dom";
import Products from "./productList";
import Menu from "./menu";
import Cart from "./cart";
import Login from "./login";
import Register from "./register";
import Message from "./message";
import AddProduct from "./addProduct";
import Loggout from "./loggout";
import ForgotPassword from "./forgotPassword";
import Payment from "./payment";
import AddExpert from "./addExpert"






export default function AppRoute() {

    return (
        <>
            <Router>

            <Menu/>

            
            <Route path="/products" exact component={Products} />
            <Route path="/payment" exact component={Payment} />
            <Route path="/" exact component={Products}/>
            <Route path="/cart" exact component={Cart} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/message" exact component={Message}/>
            <Route path="/addProduct" exact component={AddProduct}/>
            <Route path="/loggout" exact component={Loggout}/>
            <Route path="/forgotpassword" exact component={ForgotPassword}/>
            <Route path="/addExpert" exact component={AddExpert}/>

        
            </Router>
            
        </>
    )
}