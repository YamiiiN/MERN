import React from 'react'
import AdminSideBar from '../../layouts/AdminSideBar'

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

import { useFormik } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';

export default function CategoryCreate() {

    // YUP VALIDATION
    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Category name is required'),

        description: Yup.string()
            .required('Description is required'),
    });


    // FORMIK
    const formik = useFormik({
        validationSchema: validationSchema,

        initialValues: {
            name: '', // string
            description: '', // string
        },

        onSubmit: values => {
            saveCategory();
        }
    });


    // FUNCTION FOR CREATING NEW CATEGORY
    const saveCategory = async () => {

        try {

            const categoryData = {
                name: formik.values.name,
                description: formik.values.description
            }

            const { data } = await axios.post('http://localhost:5000/category/create', categoryData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            alert(data.message);
            console.log(data.category);

        } catch (error) {

            alert("Error occured!");
            console.log(error);

        }

    };



    return (

        <AdminSideBar>
            <MDBContainer>

                <div>
                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <MDBInput name='name' id='name' label='Category Name'
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

                    <MDBBtn onClick={formik.handleSubmit} className='mb-4' block size='sm'>
                        Save
                    </MDBBtn>
                </div>

            </MDBContainer>
        </AdminSideBar>

    )
}
