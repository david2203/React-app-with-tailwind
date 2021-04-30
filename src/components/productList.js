import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "./card"; 
// import formValues from "./form";



function ProductList() {

    const [products, setProducts] = useState([]);

    useEffect(()=> {
        const fetchProduct = async()=>{
           const response =  await axios.get("http://localhost:1337/products")
           setProducts(response.data)
        }
        fetchProduct()
    }, [])

    return (
        <div className="flex flex-wrap mx-auto">

            {products.map((product)=>{ return(
                 <Card key={product.id} image={product.img}productName={product.name} price={product.price} description={product.description}/>
            )})}
            
        </div>
    )
}

export default ProductList
