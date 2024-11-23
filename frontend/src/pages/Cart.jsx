import React, { useState } from 'react'
import UserNavBar from '../layouts/UserNavBar'
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import CartCard from '../components/CartCard';
import { useDispatch, useSelector } from 'react-redux';


import { baseUrl } from '../assets/constants';
import axios from 'axios';
import { stepLabelClasses } from '@mui/material';
import { removeAllFromCart } from '../state/cartSlice';


const SHIPPING_METHODS = [
    { value: "J&T Express", label: "J&T Express" },
    { value: "LBC Express", label: "LBC Express" },
    { value: "Gogo Express", label: "Gogo Express" },
]

const PAYMENT_METHODS = [
    { value: "Cash on Delivery", label: "Cash on Delivery" },
    { value: "Gcash", label: "Gcash" },
    { value: "Debit Card", label: "Debit Card" },
]


export default function Cart() {

    const { cartItems } = useSelector(state => state.cart)

    const { access_token } = useSelector(state => state.auth)

    const [shippingMethod, setShippingMethod] = useState("J&T Express");
    const [shippingAddress, setShippingAddress] = useState("Taguig");
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
    const [contact, setContact] = useState("09454058654");

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    const checkout = async () => {
        setLoading(true);

        const order = {
            order_items: cartItems.map(item => {
                return {
                    product: item._id,
                    quantity: item.quantity
                }
            }),
            shipping_method: shippingMethod,
            shipping_address: shippingAddress,
            payment_method: paymentMethod,
            contact_number: contact,
        }

        try {
            const { data } = await axios.post(`${baseUrl}/order/create`, order, {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })

            alert("Order success")

            dispatch(
                removeAllFromCart()
            )

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }


    const computeTotal = () => {
        const totalPrice = cartItems.reduce((total, product) => {
            const totalProductPrice = product.sell_price * product.quantity;
            return total + totalProductPrice
        }, 0)

        return totalPrice;
    }



    return (
        <>

            <UserNavBar />

            <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol size="12">
                            <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                                <MDBCardBody className="p-0">
                                    <MDBRow className="g-0">
                                        <MDBCol lg="8">
                                            <div className="p-5">
                                                <div className="d-flex justify-content-between align-items-center mb-5">
                                                    <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                                                        Shopping Cart
                                                    </MDBTypography>
                                                    <MDBTypography className="mb-0 text-muted">
                                                        {cartItems.length} items
                                                    </MDBTypography>
                                                </div>

                                                <hr className="my-4" />

                                                {cartItems.map(item => {
                                                    return <CartCard item={item} key={item._id} />

                                                })}



                                                <div className="pt-5">
                                                    <MDBTypography tag="h6" className="mb-0">
                                                        <MDBCardText tag="a" href="#!" className="text-body">
                                                            <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                                                            to shop
                                                        </MDBCardText>
                                                    </MDBTypography>
                                                </div>
                                            </div>
                                        </MDBCol>
                                        <MDBCol lg="4" className="bg-grey">
                                            <div className="p-5">
                                                <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                                                    Summary
                                                </MDBTypography>

                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between mb-4">
                                                    <MDBTypography tag="h5" className="text-uppercase">
                                                        {cartItems.length} items
                                                    </MDBTypography>
                                                    <MDBTypography tag="h5">₱{computeTotal()}</MDBTypography>
                                                </div>

                                                <MDBTypography tag="h5" className="text-uppercase mb-3">
                                                    Shipping Method
                                                </MDBTypography>

                                                <div className="mb-4 pb-2">
                                                    <select className="select p-2 rounded bg-grey" style={{ width: "100%" }}
                                                        onChange={(e) => setShippingMethod(e.target.value)}
                                                        value={shippingMethod}>
                                                        {SHIPPING_METHODS.map((shipping, index) => (
                                                            <option key={index} value={shipping.value}>{shipping.label}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <MDBTypography tag="h5" className="text-uppercase mb-3"
                                                    onChange={(e) => setShippingAddress(e.target.value)}
                                                    value={shippingAddress}>
                                                    Shipping Address
                                                </MDBTypography>

                                                <div className="mb-5">
                                                    <MDBInput size="lg" label="Enter your shipping address" />
                                                </div>

                                                <MDBTypography tag="h5" className="text-uppercase mb-3">
                                                    Payment Method
                                                </MDBTypography>

                                                <div className="mb-4 pb-2">
                                                    <select className="select p-2 rounded bg-grey" style={{ width: "100%" }}
                                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                                        value={paymentMethod}>
                                                        {PAYMENT_METHODS.map((shipping, index) => (
                                                            <option key={index} value={shipping.value}>{shipping.label}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <MDBTypography tag="h5" className="text-uppercase mb-3">
                                                    Contact Number
                                                </MDBTypography>

                                                <div className="mb-5">
                                                    <MDBInput size="lg" label="Enter your mobile number"
                                                        onChange={(e) => setContact(e.target.value)}
                                                        value={contact} />
                                                </div>

                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between mb-5">
                                                    <MDBTypography tag="h5" className="text-uppercase">
                                                        Total price:
                                                    </MDBTypography>
                                                    <MDBTypography tag="h5">₱{computeTotal()}</MDBTypography>
                                                </div>

                                                <MDBBtn disabled={loading} onClick={checkout} color="dark" block size="lg">
                                                    {loading ? "Processing..." : "Check out"}
                                                </MDBBtn>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    )
}