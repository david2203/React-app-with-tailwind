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
           <div class="p-2">
        <div class="block lg:flex bg-white lg:shadow-lg rounded-lg">
            <div class="w-full lg:w-1/3 flex lg:border-r border-gray-200">
                <div class="m-auto rounded-full">
                    <a href="/" class="flex items-base pt-10 lg:p-2 -mb-10 lg:-mb-0">
                        <img src="https://parsinta.com/logo/blue.png" alt="" class="w-12 lg:w-48"/>
                        <div class="block lg:hidden text-2xl text-primary hover:text-primary tracking-wide font-semibold uppercase">Parsinta</div>
                    </a>
                </div>
            </div>
            <div class="w-full lg:w-2/3 px-6 py-16">
                <div class="mb-4 font-light tracking-widest text-2xl">Add product</div>
                <form onSubmit={handleOnSubmit}>
                    <div class="mb-4">
                        <label for="product name" class="block mb-2 text-sm text-gray-800">Product name</label>
                        <input value ={formValues.productName} name="productName" onChange={handleOnChange} class="focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"  required/>
                        <div v-if="feedback.email.error">
                            <div class="text-sm text-red-500 mt-2" v-text="feedback.email.message"></div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label for="price" class="block mb-2 text-sm text-gray-800">Price</label>
                        <input type="number" value ={formValues.price} name="price" onChange={handleOnChange} class="focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" autocomplete="current-password" required/>
                    </div>
                    <div class="block md:flex items-center justify-between">
                        <button type="submit" class="align-middle bg-blue-500 hover:bg-blue-600 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg">Add product to products</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

        </>
    )
}
