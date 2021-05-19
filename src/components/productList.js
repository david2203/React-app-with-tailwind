import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "./card";





function ProductList() {

    const [products, setProducts] = useState([]);
    const [loadPage, setLoadPage] = useState(2)
    

    
    useEffect(()=> {

        // jwt gör att bara "legit" användare kan komma in
 
        const fetchProduct = async()=>{
           const response =  await axios.get(`http://localhost:1337/products?_limit=${loadPage}`)
           console.log(response.data)
          setProducts(response.data)

        }
        fetchProduct()
    }, [loadPage])

    function loadMore() {
        let dynamicPage = loadPage + 2
        setLoadPage(dynamicPage)
        
    }
    function showLess() {
        
        setLoadPage(2)
        
    }

    return (
        <>
        <div className="flex flex-wrap mx-auto">
            
            {products.map((product)=>{ return(
                 <Card key={product.id} productId={product.id} image={product.img}productName={product.name} price={product.price} description={product.description}/>
            )})}
            
        </div>
       { loadPage <= products.length ? (
        <button onClick={loadMore}>Load more</button>
       ):
        (<button onClick={showLess}>Show less</button>)
       }

        </>
    )
}

export default ProductList
