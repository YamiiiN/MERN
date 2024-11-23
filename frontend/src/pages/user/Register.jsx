import React from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBTypography,
    MDBFile
}
    from 'mdb-react-ui-kit';

import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

import { baseUrl } from '../../assets/constants';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';    



export default function Register() {

    // para mas navigate sa login to bali variable siya
    const navigate = useNavigate();


    // YUP VALIDATION
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),

        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
            .required('Password is required'),

        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match') // Ensures repeatPassword matches the password
            .required('Please confirm your password'),

        username: Yup.string()
            .min(4, 'Username must be at least 4 characters')
            .max(20, 'Username must be less than 20 characters')
            .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
            .required('Username is required'),

        images: Yup.string()
            .required('Images are required'),
    });

    // FORMIK
    const formik = useFormik({
        validationSchema: validationSchema,

        initialValues: {
            username: '',
            email: '',
            password: '',
            repeatPassword: '',
            images: '',
        },

        onSubmit: (values) => {
            // console.log(values)

            register(values);

            fireBaseAuth(values);

        }
    })

    const register = async (values) => {

        try {

            const formData = new FormData;
            for (let i = 0; i <= formik.values.images.length; i++) {
                formData.append('images', formik.values.images[i]);
            }
            formData.append('username', formik.values.username)
            formData.append('email', formik.values.email)
            formData.append('password', formik.values.password)

            const { data } = await axios.post(`${baseUrl}/user/register`, formData)

            console.log(data);

            navigate('/login')

        } catch (error) {
            alert("Error occured!");
            console.error(error);
        }
    }


    const fireBaseAuth = async (values) => {
        

        await createUserWithEmailAndPassword(auth, values.email, values.password);

        const user = auth.currentUser;

        console.log(user);

    }


    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
            <div className='mask gradient-custom-3'></div>
            <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
                <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                    <MDBInput wrapperClass='mt-4' label='Username' size='lg'
                        id='username'
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}

                    />
                    {/* CONDITIONAL RENDERING */}
                    {formik.touched.username && (
                        <small style={{ fontSize: 12, color: "red" }}>{formik.errors.username}</small>
                    )}

                    <MDBInput wrapperClass='mt-4' label='Your Email' size='lg'
                        id='email'
                        type='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {/* CONDITIONAL RENDERING */}
                    {formik.touched.email && (
                        <small style={{ fontSize: 12, color: "red" }}>{formik.errors.email}</small>
                    )}

                    <div className='mt-4'>
                        <MDBFile label='Avatar'
                            id='images'
                            name='images'
                            accept='image/*'
                            multiple
                            onChange={(e) => {
                                formik.setFieldValue("images", e.target.files)
                            }}

                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {/* CONDITIONAL RENDERING */}
                    {formik.touched.images && (
                        <small style={{ fontSize: 12, color: "red" }}>{formik.errors.images}</small>
                    )}


                    <MDBInput wrapperClass='mt-4' label='Password' size='lg'
                        id='password'
                        type='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {/* CONDITIONAL RENDERING */}
                    {formik.touched.password && (
                        <small style={{ fontSize: 12, color: "red" }}>{formik.errors.password}</small>
                    )}

                    <MDBInput wrapperClass='mt-4' label='Repeat your password' size='lg'
                        id='repeatPassword'
                        type='repeatPassword'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.repeatPassword}
                    />
                    {/* CONDITIONAL RENDERING */}
                    {formik.touched.repeatPassword && (
                        <small style={{ fontSize: 12, color: "red" }}>{formik.errors.repeatPassword}</small>
                    )}

                    <MDBBtn className='mt-4 w-100 gradient-custom-4' size='lg'
                        onClick={formik.handleSubmit}
                    >Register</MDBBtn>

                    <div>Already have an account?
                        <MDBTypography tag='strong' style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/login')}
                        >Login</MDBTypography>
                    </div>

                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    )
}
