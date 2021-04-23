import React from "react";
import Card from "./card"; 
// import formValues from "./form";

const arrayOfProducts = [
    {productName:"Headephone1", price:"1800Kr"},
    {productName:"Headephone2", price:"2800Kr"},
    {productName:"Headephone3", price:"3800Kr"},
    {productName:"Headephone4", price:"800Kr"}
]

function Products() {
    return (
        <div>
            {arrayOfProducts.map((product)=>{ return(
                 <Card productName={product.productName} price={product.price}/>
            )})}
            
        </div>
    )
}

export default Products
