import React from 'react'
import AdminNavbar from './AdminNavbar'
import Table from 'react-bootstrap/Table';

const AdminOrders = () => {
  return (
    <div>
      <AdminNavbar />
      <h3>All Orders</h3>
      <div className='container'>
        <Table bordered hover variant="dark">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>mar@example.com</td>
              <td>120000</td>
              <td>Not Delieverd</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Mark</td>
              <td>mar@example.com</td>
              <td>120000</td>
              <td>Not Delieverd</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Mark</td>
              <td>mar@example.com</td>
              <td>120000</td>
              <td>Not Delieverd</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default AdminOrders