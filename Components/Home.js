import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Products from './Products'
import Banner from './Banner'
import { auth, db } from '../FirebaseConfig/FirebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import ProductSlider from './ProductComponents/ProductSlider'
import './Home.css'
import Footer from './Footer'
import playstore from './Assets/play.jpg'
import appback from './Assets/apppart.png'
import truck from './Assets/truck.png'
import rotate from './Assets/rotate.png'
import payment from './Assets/payment.png'
import cusreq from './Assets/cusreq.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom'


const Home = () => {
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
  //if(loggeduser){
  //console.log(loggeduser[0].email)
  //}

  const serviceData = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2769/2769339.png",
      title: "Fast Shipping"
    },
    {
      icon: "https://icons-for-free.com/iconfiles/png/512/cycle+line+refresh+rotate+icon-1320191124932694301.png",
      title: "Easy Returns"
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/4718/4718443.png",
      title: "Secure Payment"
    },
    {
      icon: "https://static.thenounproject.com/png/538026-200.png",
      title: "Customization Request"
    }

  ]

  return (
    <div>
      <Navbar />
      <Banner />
      <br></br>

      <div className='services'>
        <Container>
          <Row>
            {
              serviceData.map((item, index) => (
                <Col lg="3" md="4" key={index}>
                  <div className='service_item'>
                    <span>
                      <img src={item.icon} alt='' width='60px' height='60px'></img>
                      {/* <i className={item.icon}></i> */}
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                </Col>
              ))
            }
          </Row>
        </Container>
      </div>

      <br />
      <br />
      <h2 className='slider-head'>Shop by Category</h2>

      <div className='shopbycat'>
        <div className='container'>
          <img src='https://cdn-icons-png.flaticon.com/512/1966/1966775.png'></img>
          <div className='content'>
            <Link to='/product-type/sofa'>
              <button>Sofa</button>
            </Link>
            <p>Shop Now</p>
          </div>
        </div>
        <div className='container'>
          <img src='https://cdn-icons-png.flaticon.com/512/189/189322.png'></img>
          <div className='content'>
          <Link to='/product-type/chair'>
              <button>Chair</button>
            </Link>
            <p>Shop Now</p>
          </div>
        </div>
        <div className='container'>
          <img src='https://cdn-icons-png.flaticon.com/512/2649/2649023.png'></img>
          <div className='content'>
          <Link to='/product-type/bed'>
              <button>Bed</button>
            </Link>
            <p>Shop Now</p>
          </div>
        </div>

        <div className='container'>
          <img src='https://cdn-icons-png.flaticon.com/512/1663/1663908.png'></img>
          <div className='content'>
          <Link to='/product-type/table'>
              <button>Table</button>
            </Link>
            <p>Shop Now</p>
          </div>
        </div>
      </div>
      <br />

      <div className='trending_products'>
        <Container>
          <Row>
            <Col lg="12">
              <h2 className='slider-head'>Trending Products</h2>
              <ProductSlider type={"sofa"} />
            </Col>
          </Row>
        </Container>
      </div>

      {/* <div className='app-detail'>
        <div className='intro'><img src={appback} alt=''></img>
          <img src={playstore} alt=''></img></div>
      </div> */}

      < Footer />

    </div >
  )
}

export default Home