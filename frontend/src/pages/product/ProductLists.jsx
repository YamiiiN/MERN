import React, { useState, useEffect } from 'react'
import AdminSideBar from '../../layouts/AdminSideBar'

import axios from 'axios';

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
DataTable.use(DT);

import { MDBDataTable } from 'mdbreact';

import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function ProductLists() {
    // USE STATE
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    const tableData = products.map(product => (
        {
            image: (
                <div style={{ display: 'flex', gap: 5, width: 110, overflowX: 'scroll', paddingRight:10, paddingLeft:10 }}>
                    {product.images.map(image => (
                        <img key={image._id} src={image.url} style={{ width: 100, height: 100, objectFit: 'contain' }} />
                    ))}
                </div>
            ),
            name: product.name,
            description: product.description,
            category: product.category?.name, //INCASE NA EXISTING PA YUNG PROD NA WALANG CATEGORY
            cost_price: product.cost_price,
            sell_price: product.sell_price,
            stock_quantity: product.stock_quantity,
            action: (
                <div>
                    <Button onClick={() => navigate(`/product/update/${product._id}`)} color='success' size='small'>
                        Edit
                    </Button>
                    <Button onClick={() => deleteProduct(product._id)} color='error' size='small'>
                        Delete
                    </Button>
                </div>
            ),
        }
    ))

    const deleteProduct = async (id) => {
        if (window.confirm('Are you sure do you want to delete this product?')) {
            await axios.delete(`http://localhost:5000/product/delete/${id}`);
            getProducts();
        }
    }

    const data = {
        columns: [
            {
                label: 'Image',
                field: 'image',
                sort: 'asc',
                width: 150,
            },
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 150,
            },
            {
                label: 'Description',
                field: 'description',
                sort: 'asc',
                width: 270,
            },
            {
                label: 'Category',
                field: 'category',
                sort: 'asc',
                width: 150,
            },
            {
                label: 'Cost Price',
                field: 'cost_price',
                sort: 'asc',
                width: 200,
            },
            {
                label: 'Sell Price',
                field: 'sell_price',
                sort: 'asc',
                width: 100,
            },
            {
                label: 'Stock Quantity',
                field: 'stock_quantity',
                sort: 'asc',
                width: 100,
            },
            {
                label: 'Action',
                field: 'action',
                sort: 'asc',
                width: 100,
            },
        ],

        rows: tableData
    }


    useEffect(() => {

        getProducts();

    })

    const getProducts = async () => {

        const { data } = await axios.get('http://localhost:5000/product/get/all');

        setProducts(data.products);
        // console.log(data)

    }

    return (

        <AdminSideBar>

            <MDBDataTable             
                striped
                bordered
                hover
                data={data}
                responsive
            />

        </AdminSideBar>

    )
}
