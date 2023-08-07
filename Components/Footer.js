import React from "react";
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF , faInstagram,faTwitter, faLinkedin} from '@fortawesome/free-brands-svg-icons';



const Footer = () => {
  return (
    
    <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="/aboutus">About Us</a></li>
            <li><a href="#">Our services</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Affiliate Program</a></li>
            <li><a href="#">AR View</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Get Help</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Order Status</a></li>
            <li><a href="#">Payment Options</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Online Shop</h4>
          <ul>
            <li><a href="#">bed</a></li>
            <li><a href="#">Chair</a></li>
            <li><a href="#">Sofa</a></li>
            <li><a href="#">Table</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Follow Us</h4>
          <div class="social-links">
            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
          </div>
        </div>
      </div>
    </div>
 </footer>
     
  );
};

export default Footer;

