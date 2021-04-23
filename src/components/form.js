import React, {useState} from "react";

export default function Form() {

    const initialValues = {
        productName:" ",
        price:" "
    }
    const [formValues, setFormValues] = useState(initialValues)

    function handleOnSubmit(e) {

        e.preventDefault();

        console.log("name: ", formValues.productName, "price: ", formValues.price)
    }
    

    function handleOnChange(e) {

        setFormValues(
            {
           ...formValues,[e.target.name]:e.target.value
            }
        )
        
    }
    return (
        <>
           <form onSubmit={handleOnSubmit}>

               <input value ={formValues.productName} name="productName" onChange={handleOnChange}/>
               <input type="number" value ={formValues.price} name="price" onChange={handleOnChange}/>
               
               <button>Lägg till</button>
           </form>
        </>
    )
}
