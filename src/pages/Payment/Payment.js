import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from "../../components/Header";
import { apiKey } from '../../api/ApiKey';
import { formatPrice } from "../../utility/utility";
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './payment_style.css';


const Payment = () => {
    const validateCheckout = () => {

    };

    const [cart, setCart] = useState({});
    let currentUser = JSON.parse(sessionStorage['user']);

    useEffect(() => {
        // Call API to get the cart information
        axios.get(apiKey + 'cart/' + currentUser.id)
            .then(response => {
                console.log(response.data.data);
                if (response.data.msg === "Successful") {
                    setCart(response.data.data);

                } else if (response.data.msg === "Cart not found") {
                    setCart({
                        bill: 0
                    })
                } else {
                    alert("Get cart failed");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const setFullName = (e) => {
        console.log(e);
    }

    const setEmail = (e) => {
        console.log(e);
    }

    const handlePaymentMethod = () => {

    }

    return (
        <div>
            <Header user={sessionStorage["user"]} />
            {/* <!-- Payment form --> */}
            <div id="payment" className="wrapper">
                <h2>Payment Form </h2>
                <form action="" method="post">
                    {/* <!--Account Information Start--> */}
                    <h4>Account</h4>
                    <div className="input_group">
                        <div className="input_box">
                            <input
                                type="text"
                                placeholder={"Full Name"}
                                required
                                className="name"
                                defaultValue={currentUser ? currentUser.name : ""}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <i className="fa fa-user icon"></i>
                        </div>
                    </div>
                    <div className="input_group">
                        <div className="input_box">
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                className="name"
                                defaultValue={currentUser ? currentUser.email : ""}
                                onChange={(e) => setFullName(e.target.value)} />
                            <i className="fa fa-envelope icon"></i>
                        </div>
                    </div>
                    <div className="input_group">
                        <div className="input_box">
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                className="name"
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <i className="fa fa-map-marker icon" aria-hidden="true"></i>
                        </div>
                    </div>
                    {/* <div className="input_group">
            <div className="input_box">
              <input type="text" placeholder="City" required className="name" />
              <i className="fa fa-institution icon"></i>
            </div>
          </div> */}
                    {/* <!--Account Information End--> */}

                    {/* <!--DOB & Gender Start--> */}
                    {/* <div className="input_group">
                        <div className="input_box">
                            <h4>Date Of Birth</h4>
                            <input type="text" placeholder="DD" required className="dob" />
                            <input type="text" placeholder="MM" required className="dob" />
                            <input type="text" placeholder="YYYY" required className="dob" />
                        </div>
                        <div className="input_box">
                            <h4>Gender</h4>
                            <input type="radio" name="gender" className="radio" id="b1" checked />
                            <label className="gen" htmlFor="b1">Male</label>
                            <input type="radio" name="gender" className="radio" id="b2" />
                            <label className="gen" htmlFor="b2">Female</label>
                        </div>
                    </div> */}
                    {/* <!--DOB & Gender End--> */}

                    {/* <!--Payment Details Start--> */}
                    <div className="input_group">
                        <div className="input_box">
                            <h4>Payment Details</h4>
                            <input type="radio" name="pay" className="radio" id="bc1" checked onChange={() => handlePaymentMethod()} />
                            <label htmlFor="bc1">
                                <span>
                                    <i className="fa fa-cc-visa"></i>Credit Card
                                </span>
                            </label>
                            <input type="radio" name="pay" className="radio" id="bc2" onChange={() => handlePaymentMethod()} />
                            <label htmlFor="bc2">
                                <span>
                                    <i className="fa fa-cc-paypal"></i>Paypal
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="input_group">
                        <div className="input_box">
                            <input
                                type="tel"
                                name=""
                                className="name"
                                placeholder="Card Number, example: 1111-2222-3333-4444"
                                required
                            />
                            <i className="fa fa-credit-card icon"></i>
                        </div>
                    </div>
                    <div className="input_group">
                        <div className="input_box">
                            <input
                                type="tel"
                                name=""
                                className="name"
                                placeholder="Card CVC, example: 632"
                                required
                            />
                            <i className="fa fa-user icon"></i>
                        </div>
                    </div>
                    <div className="input_group">
                        <div className="input_box">
                            <div className="input_box">
                                <input
                                    type="number"
                                    placeholder="Exp Month"
                                    required
                                    className="name"
                                />
                                <i className="fa fa-calendar icon" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="input_box">
                            <input
                                type="number"
                                placeholder="Exp Year"
                                required
                                className="name"
                            />
                            <i className="fa fa-calendar-o icon" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="input_box">
                        <input
                            name="amount"
                            readOnly
                            placeholder="100"
                            required
                            className="name"
                            value={cart.bill ? formatPrice(cart.bill) : 100}
                        />{" "}
                        <i className="fa fa-dollar icon" aria-hidden="true"></i>
                    </div>
                    {/* <!--Payment Details End--> */}

                    <div className="input_group">
                        <div className="input_box">
                            <button type="button" onClick={validateCheckout}>
                                Pay Now
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Payment;
