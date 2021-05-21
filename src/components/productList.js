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
        <div className="flex items-center justify-center flex-wrap mx-auto">
            
            {products.map((product)=>{ 
                
                return(
                 <Card key={product.id} image={product.Img} productName={product.Name} price={product.Price} description={product.Description}/>
                )
            })}
            
            </div>
       { loadPage <= products.length ? (
        <button
        className="mt-3 text-lg font-semibold 
        bg-black w-full text-white rounded-lg 
        px-6 py-3 block shadow-xl hover:bg-gray-700"
        onClick={loadMore}>Load more</button>
       ):
        (<button
            className="mt-3 text-lg font-semibold 
            bg-black w-full text-white rounded-lg 
            px-6 py-3 block shadow-xl hover:bg-gray-700"
        onClick={showLess}>Show less</button>)
       }

    </>
    )
}

export default ProductList
