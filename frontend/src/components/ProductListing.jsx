import React, { useEffect, useState } from "react";
import {
    MDBContainer,
} from "mdb-react-ui-kit";


import axios from "axios";
import { baseUrl } from "../assets/constants";
import ProductCard from "./ProductCard";



export default function ProductListing() {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {

        try {
            const { data } = await axios.get(`${baseUrl}/product/get/all`)

            // console.log(data);

            setProducts(data.products);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts();
    }, [])





    return (
        <MDBContainer className="my-5">
            <div className='d-flex gap-4 flex-wrap justify-content-center'>

                {products.map(product => (
                   
                    <ProductCard key={product._id} product={product}/>
                   
                ))}

            </div>

        </MDBContainer>

    )
}
