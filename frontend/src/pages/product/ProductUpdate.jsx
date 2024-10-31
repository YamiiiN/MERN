import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../layouts/AdminSideBar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBContainer,
    MDBTextArea,
    MDBFile,
    // MDBSelect
} from 'mdb-react-ui-kit';


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function ProductUpdate() {

    // PARA MAKUHA YUNG ID NG NASA LINK OR WEBSITE
    const { id } = useParams();

    // USE STATE
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    // YUP VALIDATION
    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required'),

        description: Yup.string()
            .required('Description is required'),

        category: Yup.string()
            .required('Category is required'),

        sell_price: Yup.number()
            .required('Sell price is required')
            .positive('Sell price must be a positive number'),

        cost_price: Yup.number()
            .required('Cost price is required')
            .positive('Cost price must be a positive number'),

        stock_quantity: Yup.number()
            .required('Stock quantity is required')
            .integer('Stock quantity must be an integer')
            .min(0, 'Stock quantity cannot be negative'),

        // images: Yup.string()
        //     .required('Images are required'),
    });

    // FORMIK
    const formik = useFormik({
        validationSchema: validationSchema,


        initialValues: {
            name: '', // string
            description: '', // string
            category: '', // sring id
            sell_price: '', // number
            cost_price: '', // number
            stock_quantity: '', // number
            images: '', // object images
        },
        onSubmit: values => {
            // console.log("running")
            // alert(JSON.stringify(values, null, 2));
            saveData();
        },
    });

    // FUNCTION FOR RETRIEVING CATEGORIES
    const getCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/category/get/all');

            setCategories(data.categories)
        } catch (error) {

            console.error(error);

        }
    }

    // FUNCTION FOR GETTING SINGLE PRODUCT
    const getProduct = async () => {

        const { data } = await axios.get(`http://localhost:5000/product/${id}`);

        formik.setFieldValue('name', data.product.name)
        formik.setFieldValue('description', data.product.description)
        formik.setFieldValue('category', data.product.category._id)
        formik.setFieldValue('sell_price', data.product.sell_price)
        formik.setFieldValue('cost_price', data.product.cost_price)
        formik.setFieldValue('stock_quantity', data.product.stock_quantity)

    }

    // FUNCTION FOR UPDATING SINGLE PRODUCT
    const saveData = async () => {
        try {

            const formData = new FormData(); // FormData() is an object that handles file uplaods

            formData.append('name', formik.values.name)
            formData.append('description', formik.values.description)
            formData.append('category', formik.values.category)
            formData.append('sell_price', formik.values.sell_price)
            formData.append('cost_price', formik.values.cost_price)
            formData.append('stock_quantity', formik.values.stock_quantity)

            for (let i = 0; i <= formik.values.images.length; i++) {

                formData.append('images', formik.values.images[i]);

            }

            const { data } = await axios.put(`http://localhost:5000/product/update/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert(data.message);
            navigate('/product/lists')
            console.log(data.product);

        } catch (error) {

            alert("Error occured!");
            console.error(error);

        }
    }

    useEffect(() => {
        getProduct();
        getCategories();
    }, [])

    return (

        <AdminSideBar>

            <MDBContainer>
                <div>

                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <MDBInput name='name' id='name' label='Product Name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />

                            {/* CONDITIONAL RENDERING */}
                            {formik.touched.name && (
                                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.name}</small>
                            )}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <MDBTextArea name='description' id='description' label='Description' rows={4}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                            />
                            {formik.touched.description && (
                                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.description}</small>
                            )}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <FormControl fullWidth size="small">
                                <InputLabel id="category">Select Category</InputLabel>
                                <Select labelId="category" id='category' name='category' abel="Select Category"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.category}
                                >
                                    {categories.map(category => (
                                        <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                            {formik.touched.category && (
                                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.category}</small>
                            )}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <MDBInput name='sell_price' id='sell_price' type='number' label='Sell Price'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.sell_price}
                            />
                            {formik.touched.sell_price && (
                                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.sell_price}</small>
                            )}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <MDBInput name='cost_price' id='cost_price' type='number' label='Cost Price'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.cost_price}
                            />
                            {formik.touched.cost_price && (
                                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.cost_price}</small>
                            )}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <MDBInput name='stock_quantity' id='stock_quantity' type='number' label='Quantity'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.stock_quantity}
                            />
                            {formik.touched.stock_quantity && (
                                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.stock_quantity}</small>
                            )}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <MDBFile name='images' id='images' style={{ marginBottom: 20 }} label='Image' multiple
                                onChange={(e) => {
                                    console.log(e.target.files)
                                    formik.setFieldValue("images", e.target.files)
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.images && (
                                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.images}</small>
                            )}
                        </MDBCol>
                    </MDBRow>

                    <MDBBtn onClick={formik.handleSubmit} className='mb-4' block size='sm'>
                        Update
                    </MDBBtn>
                </div>
            </MDBContainer>

        </AdminSideBar>

    )
}
