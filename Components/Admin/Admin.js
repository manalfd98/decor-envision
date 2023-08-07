import React from 'react'
import AdminNavbar from '../Admin/AdminNavbar'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import './Admin.css'
import useGetData from './useGetData';
import useGetUser from './useGetUser';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, AreaChart, YAxis, Area, CartesianGrid } from 'recharts'

const Admin = () => {
    const { data: product } = useGetData("product")
    const { data: users } = useGetUser("users")

    const orderStatics = [
        {
            name: "Mon",
            orderStats: 1000
        },
        {
            name: "Tues",
            orderStats: 2000
        },
        {
            name: "Wed",
            orderStats: 5000
        },
        {
            name: "Thurs",
            orderStats: 1500
        },
        {
            name: "Fri",
            orderStats: 6000
        },
        {
            name: "Sat",
            orderStats: 9000
        },

    ]
    const orderData = [
        {
            name: "Mon",
            week: 3000,
            prevWeek: 2400
        },
        {
            name: "Tues",
            week: 1000,
            prevWeek: 4400
        },
        {
            name: "Wed",
            week: 2000,
            prevWeek: 3400
        },
        {
            name: "Thurs",
            week: 5000,
            prevWeek: 1400
        },
        {
            name: "Fri",
            week: 8000,
            prevWeek: 6400
        },
        {
            name: "Sat",
            week: 2000,
            prevWeek: 4400
        },
    ]

    return (
        <div>
            <AdminNavbar />
            <div>
                <h3>Dashboard</h3>
            </div>

            <section>
                <Container>
                    <Row>
                        <Col lg="3">
                            <div className='totalprod'>
                                <h5>Total Products</h5><span>{product.length}</span>
                            </div>
                        </Col>
                        <Col lg="3">
                            <div className='totalorder'>
                                <h5>Total Orders</h5><span>0</span>
                            </div>
                        </Col>
                        <Col lg="3">
                            <div className='totaluser'>
                                <h5>Total Users</h5><span>{users.length}</span>
                            </div>
                        </Col>
                        <Col lg="3">
                            <div className='totalrevenue'>
                                <h5>Total Revenue</h5><span>Rs 0</span>
                            </div>
                        </Col>
                    </Row>


                    <div className='statics'>
                        <div className='stats'>
                            <h3 className='stats_title'>Order Stats</h3>
                            <ResponsiveContainer width='100%' aspect={4 / 1}>
                                <BarChart data={orderStatics}>
                                    <XAxis dataKey='name' stroke='#2884ff' />
                                    <Bar dataKey='orderStats' stroke='#2884ff' fill='#2884ff' barSize={30}>
                                    </Bar>
                                    <Tooltip wrapperClassName='tooltip_style' cursor={false} />

                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className='stats'>
                            <h3 className='stats_title'>Order Stats</h3>
                            <ResponsiveContainer>
                                <AreaChart data={orderData}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke='#ddd' />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="0" stroke='#b7ffe913' />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="week" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                    <Area type="monotone" dataKey="prevweek" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                    <br />
                    <div className='recent-orders'>
                        <h5 style={{color:'black'}}>Recent Orders</h5>
                        <Table bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer Name</th>
                                    <th>Email</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    
                                </tr>
                            </tbody>
                        </Table>

                    </div>



                </Container>
            </section>
        </div>
    )
}

export default Admin