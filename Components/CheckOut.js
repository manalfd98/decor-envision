import './CheckOut.css'
import React, { useEffect, useState, Component } from 'react'
import Navbar from './Navbar'
import './CheckOut.css'
import { Route } from 'react-router-dom'
import { auth, db } from '../FirebaseConfig/FirebaseConfig'
import { updateProfile } from 'firebase/auth'
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore'
import CartCard from './CartCard'
import { Link, Navigate, useNavigate } from 'react-router-dom';


const CheckOut = () => {
  function GetCurrentUser() {
    const [user, setUser] = useState('')
    const usersCollectionRef = collection(db, "users")

    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(collection(db, "users"), where("uid", "==", userlogged.uid))
            //console.log(q)
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          }
          getUsers();
        }
        else {
          setUser(null)
        }
      })
    }, [])
    return user
  }
  const loggeduser = GetCurrentUser();
  // if (loggeduser) {
  //   console.log(loggeduser[0].email)
  // }
  const [cartdata, setcartdata] = useState([]);
  if (loggeduser) {
    const getcartdata = async () => {
      const cartArray = [];
      const path = `cart-${loggeduser[0].uid}`

      getDocs(collection(db, path)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cartArray.push({ ...doc.data(), id: doc.id })
        });
        setcartdata(cartArray)
      }).catch('Error Error Error')
    }
    getcartdata()

  }

  // get the number of quantity
  const quantity = cartdata.map(cartdata => {
    return cartdata.quantity;
  })
  // console.log(quantity);
  const reducequantity = (accumulator, currentValue) => accumulator + currentValue;
  const totalqty = quantity.reduce(reducequantity, 0);
  let totalqty1 = parseInt(totalqty)
  // console.log(totalqty);

  // get the number of total price
  const price = cartdata.map(cartdata => {
    return cartdata.product.price * cartdata.quantity
  })

  
  const reduceprice = (accumulator, currentValue) => accumulator + currentValue;
  const totalprice = price.reduce(reduceprice, 0);
  const navigate = useNavigate()
  const [fulladdress, setfulladdress] = useState('')
  const [zipcode, setzipcode] = useState('')
  const [state, setstate] = useState('')
  const [city, setcity] = useState('')
  const [carttotalprice] = useState(totalprice);
  const [cartqty] = useState(totalqty);


  const handleCashDelivery = (e) => {
    e.preventDefault();
    const uid = loggeduser[0].uid;
    const userdata = async () => {
      await db.collection('users').doc(uid).get();
      await db.collection('Buyer-personal-info').add({
        Name: userdata.data().name,
        Email: userdata.data().email,
        FullAddress: fulladdress,
        Zipcode: zipcode,
        City: city,
        State: state,
        CartTotalPrice: carttotalprice,
        CartQty: cartqty
      })
      const path = `cart-${loggeduser[0].uid}`
      const cartdata = await db.collection(path).get();
      for (var snap of cartdata.doc) {
        var data = snap.data();
        data.id = snap.id;
        await db.collection('Buyer-Cart' + uid).add(data);
        await db.collection('cart' + uid).doc(snap.id).delete();

      }

      navigate('/product-type/sofa');
      console.log('orderplaced');

    }


  }


  return (
    <div>
      <Navbar />
      <div>
        <div className="py-3 ">
          <div className="Container">
            <h6>Checkout Details</h6>
          </div>

        </div>
      </div>
      {loggeduser &&
        <div className="py-2">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="card">
                  <div className="card-header">
                    <h4>Basic Information</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label> Full Name</label>
                          <input type="text" className='form-control'
                            value={loggeduser[0].username} required
                            disabled />
                        </div>

                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label> Email Address</label>
                          <input type="email" className='form-control'
                            value={loggeduser[0].email} required
                            disabled />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label> Phone Number</label>
                          <input type="text" name="phone" className="form-control" required pattern="[0-9]{4}[0-9]{7}" value={loggeduser[0].phonenumber}>
                          </input>
                        </div>
                      </div>
                      
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <label>Full Address</label>
                          <textarea rows="3" className="form-control" value={fulladdress} onChange={(e) => setfulladdress(e.target.value)} >
                          </textarea>

                        </div>

                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label> City</label>
                          <input type="text" name="city" className="form-control" onChange={(e) => setcity(e.target.value)} value={city} required>
                          </input>

                        </div>
                        <div className="form-group mb-3">
                          <label> Total Amount</label>
                          <input type="text" name="city" className="form-control" value={totalprice} required>
                          </input>

                        </div>


                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label>State</label>
                          <select name="state" id="state" value={state} onChange={(e) => setstate(e.target.value)} required>
                            <option value="sindh">Sindh</option>
                            <option value="punjab">Punjab</option>
                            <option value="balochistan">Balochistan</option>
                            <option value="khyber pakhtunkhaw">Khyber Pakhtunkhwa</option>
                          </select>


                        </div>

                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label> Zip Code</label>
                          <input type="text" name="zipcode" className="form-control" value={zipcode} onChange={(e) => setzipcode(e.target.value)} required>
                          </input>
                        </div>
                        <div className="form-group mb-3">
                          <label> Total num of Product</label>
                          <input type="text" className="form-control" value={totalqty} required>
                          </input>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-0 ">
                          <Link to='/cart'><button type="button" className="btn btn-primary" >Back</button></Link>

                        </div>

                      </div>
                      <div className="col-md-12">
                        <div className="form-group text-end">
                          <button type="button" className="btn btn-primary" onClick={handleCashDelivery} >Place Order</button>
                        </div>
                        <div className="form-group text-end">
                          <h6 >Payment Method: Cash On Delivery</h6>
                        </div>



                      </div>

                    </div>

                  </div>

                </div>

              </div>
              <div className="col-md-5">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th wiidth="50%">Product</th>
                      <th>Price</th>
                      <th>Product Type</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartdata.map(item => (
                        <tr key={item.id}>
                          <td>
                            {item.product.producttitle}
                          </td>
                          <td>{item.product.price}</td>
                          <td>{item.product.producttype}</td>
                          <td>{item.quantity}</td>

                        </tr>
                      ))

                    }


                  </tbody>

                </table>
              </div>

            </div>
          </div>

        </div>
        }
    </div>

  )
}

export default CheckOut