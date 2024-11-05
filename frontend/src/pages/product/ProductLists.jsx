import React, { useState, useEffect } from 'react'
import AdminSideBar from '../../layouts/AdminSideBar'

import axios from 'axios';

import MUIDataTables from 'mui-datatables'

import { Button, TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function ProductLists() {
    // USE STATE
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    const tableData = products.map(product => (
        {
            _id: product._id,
            image: (
                <div style={{ display: 'flex', gap: 5, width: 110, overflowX: 'scroll', paddingRight: 10, paddingLeft: 10 }}>
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

    const columns = [
        {
            label: 'Image',
            name: 'image',
            options: {
                display: false,
                filter: false,
            }

        },
        {
            label: 'Name',
            name: 'name',
            options: {
                filter: true,
                sort: true,
                display: false,
            }
        },
        {
            label: 'Description',
            name: 'description',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: 'Category',
            name: 'category',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: 'Cost Price',
            name: 'cost_price',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: 'Sell Price',
            name: 'sell_price',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: 'Stock Quantity',
            name: 'stock_quantity',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: 'Action',
            name: 'action',
            options: {
                filter: false,
            }
        }
    ]





    useEffect(() => {

        getProducts();

    }, [])

    const getProducts = async () => {

        const { data } = await axios.get('http://localhost:5000/product/get/all');

        setProducts(data.products);
        // console.log(data)

    }


    const bulkDelete = async (ids) => {
        try {


            const { data } = await axios.put(`http://localhost:5000/product/bulk/delete`, {
                productIds: ids,
            })

            getProducts();

        } catch (error) {
            console.log(error)
        }
    }

    return (

        <AdminSideBar>


            <MUIDataTables
                title={"Products List"}
                data={tableData}
                columns={columns}
                options={{

                    expandableRows: true,
                    responsive: 'standard',
                    filterType: 'multiSelect',

                    onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
                        // console.log(currentRowsSelected);
                    },

                    // PARA SA BULK DELETE
                    onRowsDelete: ({ data }) => {
                        const ids = data.map(d => (
                            tableData[d.index]._id
                        ))

                        // console.log(ids)
                        bulkDelete(ids);
                    },

                    // Expandable
                    renderExpandableRow: (rowData, rowMeta) => {
                        const colSpan = rowData.length + 1; 
                        return (
                            // <div>
                            //     {rowData[0]}
                            // </div>



                            <TableRow>
                                <TableCell colSpan={colSpan}>
                                    {rowData[0]}
                                </TableCell>
                            </TableRow>

                            

                        )
                    },


                }}

            />

        </AdminSideBar>

    )
}
