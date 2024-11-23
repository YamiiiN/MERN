import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../layouts/AdminSideBar'
import axios from 'axios';
import { baseUrl } from '../../assets/constants';
import { useSelector } from 'react-redux';
import MUIDataTables from 'mui-datatables'
import { Button, TableCell, TableRow } from '@mui/material';



export default function OrdersList() {

    const [orders, setOrders] = useState([]);
    const { access_token } = useSelector(state => state.auth);

    const getAllOrders = async () => {

        try {
            const { data } = await axios.get(`${baseUrl}/order/all`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })

            // console.log(data.orders)
            setOrders(data.orders);
        } catch (error) {

        }
    }


    useEffect(() => {

        getAllOrders()

    }, [])

    const tableData = orders.map(order => {
        return {
            user: order.user.username,
            ordered_date: order.createdAt,
            status: order.status,
            action: order,
            order: JSON.stringify(order),
        }
    })

    const columns = [
        {
            label: 'Order',
            name: 'order',
            options: {
                display: false,
            }
        },
        {
            label: 'User',
            name: 'user',
            options: {

            }

        },
        {
            label: 'Ordered Date',
            name: 'ordered_date',
            options: {
                customBodyRender: (orderDate) => {
                    const date = new Date(orderDate);
                    const options = { month: 'short', day: 'numeric', year: 'numeric' };
                    const formatedDate = date.toLocaleString('en-US', options);
                    return formatedDate;
                }
            }
        },
        {
            label: 'Status',
            name: 'status',
            options: {

            }
        },
        {
            label: 'Action',
            name: 'action',
            options: {
                customBodyRender: (order) => {
                    // console.log(order);
                    if (order.status.toLowerCase() === "pending") {
                        return (
                            <div style={{ display: 'flex', gap: 5 }} >
                                <Button variant='outlined' color='error' size='small'
                                    onClick={() => updateStatus({ id: order._id, status: 'cancelled' })}
                                >
                                    Cancel
                                </Button>
                                <Button variant='outlined' color='success' size='small'
                                    onClick={() => updateStatus({ id: order._id, status: 'confirmed' })}
                                >
                                    Confirm
                                </Button>
                            </div>
                        )
                    } else if (order.status?.toLowerCase() === "confirmed") {
                        return (
                            <Button variant='outlined' size='small'
                                onClick={() => updateStatus({ status: 'on-delivery', id: order._id })}
                            >
                                Deliver
                            </Button>
                        )
                    }
                    else if (order.status?.toLowerCase() === "on-delivery") {
                        return (
                            <Button variant='outlined' size='small'
                                onClick={() => updateStatus({ status: 'delivered', id: order._id })}
                            >
                                Delivered
                            </Button>
                        )
                    } else {
                        return (
                            <Button variant='outlined' size='small' disabled={true}>
                                No action
                            </Button>
                        )

                    }

                    // return order._id
                }

            }
        }
    ]


    const updateStatus = async ({ id, status }) => {
        try {
            const { data } = await axios.post(`${baseUrl}/order/update/status/${id}`, {
                status: status,
            }, {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })

            alert("Order updated");
            getAllOrders();

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <AdminSideBar>
            <MUIDataTables
                title={"Order Lists"}
                data={tableData}
                columns={columns}
                options={{
                    responsive: 'standard',
                    filterType: 'multiselect',
                    selectableRows: 'none',
                    expandableRows: true,
                    renderExpandableRow: (rowData, rowMeta) => {// added
                        const order = JSON.parse(rowData[0]);
                        const orderItems = order.order_items
                        return (
                            <TableRow style={{ flexWrap: 'wrap' }}>
                                <TableCell />
                                {orderItems.map(item => (
                                    <>
                                        <TableCell style={{ minWidth: 'fit-content', }}>
                                            <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                                <img src={item.product.images[0].url} width={60} height={60} />
                                                <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                    <div>
                                                        <span style={{ fontWeight: 800 }}>Product:</span> {item.product.name}
                                                    </div>
                                                    <div>
                                                        <span style={{ fontWeight: 800 }}>Quantity:</span> {item.quantity}
                                                    </div>
                                                    <div>
                                                        <span style={{ fontWeight: 800 }}>Total Price:</span> P{item.quantity * item.product.sell_price}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </>
                                ))}
                            </TableRow>
                        )
                    }

                }}

            />
        </AdminSideBar>
    )
}
