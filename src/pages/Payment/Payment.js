import Header from "../../components/Header";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import './payment_style.css';
import { apiKey } from '../../api/ApiKey';
import axios from 'axios';



import Swal from 'sweetalert2';

import { useState, useEffect } from 'react';




const Payment = () => {
  const handleClick = () => {
    alert("Successfully paid!. You will return to home page");
    window.location.href = "/";
  };

  let user = JSON.parse(sessionStorage['user']);

  const [cart, setCart] = useState({});

  const [shippingInfo, setShippingInfo] = useState({});

  const [paymentOption, setPaymentOption] = useState('cod');

  let currentUser = JSON.parse(sessionStorage['user']);

  const handleCreateOrder = async () => { 
    if(paymentOption === 'cod'){
      //Create the order here 
      const userId = currentUser.id;
      var items = cart.items.map(item => {
        return {
          quantity : item.quantity,
          image : item.image,
          productId : item.productId, 
          name : item.name, 
          colorOption : item.colorOption,
          storageOption : item.storageOption,
          price : item.price
        }
      });

      var body = {
        userId : userId,
        items : items,
        shippingInfo : shippingInfo,
        bill : cart.bill,
        status : "open"
      }

      // alert(JSON.stringify(body));


      await axios.post(apiKey + 'order', body)
			.then((res) => {
				// Fire a success notification and save token, user info on success
				if (res.status === 200 && res.data.msg === 'Successful') {
					// Order created successfully
					Swal.fire({
						title: 'Order created successfully',
						html: 'Yor order has been placed !',
						timer: 3000,
						icon: 'success',
						confirmButtonColor: '#3085d6',
						confirmButtonText: 'Redirect'
					}).then(() => {
						window.location = "/";
					});
				}
        else{
					Swal.fire({
						title: 'Failed',
						html: 'Something went wrong',
						timer: 3000,
						icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Let me try again'
					}).then(() => {
						window.location = "/";
					}); 
        }
			}).catch((error) => {
				Swal.fire({
					title: 'Order',
					text: error.response.data.msg,
					icon: 'error',
					confirmButtonColor: '#3085d6',
					confirmButtonText: 'Let me try again'
				});
			});

    }else{
      // alert("Momo đang làm")


      var body ={
        orderInfo : "Thanh toán hóa đơn của " + user.name,
        amount : cart.bill.toString(), 

      }


      await axios.post(apiKey + 'momoCheckout', body)
			.then((res) => {
				if (res.status === 200 && res.data.localMessage === "Thành công") {
					// Order created successfully
					Swal.fire({
						title: 'Đang chuyển sang cổng thanh toán momo',
						html: res.data.payUrl,
						timer: 3000,
						icon: 'success',
						// confirmButtonColor: '#3085d6',
						// confirmButtonText: 'Redirect'
					}).then(()=>{
            // window.location.href = res.data.payUrl;
            if(res.data.payUrl){
              window.open(res.data.payUrl);
            }
          })

          
          
				}
        else{
					Swal.fire({
						title: 'Failed',
						html: 'Something went wrong',
						timer: 3000,
						icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Let me try again'
					})
        }
			}).catch((error) => {
				Swal.fire({
					title: 'Order',
					text: error.response.data.msg,
					icon: 'error',
					confirmButtonColor: '#3085d6',
					confirmButtonText: 'Let me try again'
				});
			});



    }
  }

  useEffect(()=> {
    // Call API to get the cart information
    axios.get(apiKey + 'cart/' + currentUser.id)
    .then(response => {
        console.log(response.data.data);
        if (response.data.msg === "Successful") {
            setCart(response.data.data);

        } else if (response.data.msg === "Cart not found") {
          setCart({
            bill : 0
          })
        } else {
            alert("Get cart failed");
        }
    })
    .catch(error => {
        console.log(error);
    });
  }, [])
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
                placeholder="Full Name"
                required
                className="name"
                onChange={(e) => {
                  setShippingInfo({
                    ...shippingInfo,
                    name : e.target.value
                  })
                }}
              />
              <i className="fa fa-user icon"></i>
            </div>
          </div>
          <div className="input_group">
            <div className="input_box">
              <input
                type="text"
                placeholder="Phone number"
                required
                className="name"
                onChange={(e) => {
                  setShippingInfo({
                    ...shippingInfo,
                    contact : e.target.value
                  })
                }}
              />
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
                onChange={(e) => {
                  setShippingInfo({
                    ...shippingInfo,
                    address : e.target.value
                  })
                }}
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
          <div className="input_group">
            <div className="input_box">
              <h4>Date Of Birth</h4>
              <input type="text" placeholder="DD" required className="dob" />
              <input type="text" placeholder="MM" required className="dob" />
              <input type="text" placeholder="YYYY" required className="dob" />
            </div>
            <div className="input_box">
              <h4>Gender</h4>
              <input type="radio" name="gender" className="radio" id="b1" checked/>
              <label  className="gen"for="b1">Male</label>
              <input type="radio" name="gender" className="radio" id="b2" />
              <label  className="gen"for="b2">Female</label>
            </div>
          </div>
          {/* <!--DOB & Gender End--> */}

          {/* <!--Payment Details Start--> */}
          <div className="input_group">
            <div className="input_box">
              <h4>Payment Details</h4>
              <input type="radio" name="pay"  className="radio" id="bc1" checked = {paymentOption === 'cod'}  onChange={()=>{setPaymentOption('cod')}}/>
              <label for="bc1">
                <span>
                  COD
                </span>
              </label>
              <input type="radio" name="pay" className="radio" id="bc2" checked = {paymentOption === 'momo'} onChange={()=>{setPaymentOption('momo')}} />
              <label for="bc2">
                <span>
                  MOMO
                </span>
              </label>

              
            </div>
          </div>
          {/* <div className="input_group">
            <div className="input_box">
              <input
                type="tel"
                name=""
                className="name"
                placeholder="Card Number 1111-2222-3333-4444"
                required
              />
              <i className="fa fa-credit-card icon"></i>
            </div>
          </div> */}
          {/* <div className="input_group">
            <div className="input_box">
              <input
                type="tel"
                name=""
                className="name"
                placeholder="Card CVC 632"
                required
              />
              <i className="fa fa-user icon"></i>
            </div>
          </div> */}
          {/* <div className="input_group">
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
          </div> */}
          <div className="input_box">
            <input
              name="amount"
              readonly
              type="number"
              placeholder="100"
              required
              className="name"
              value = {cart.bill}
            />{" "}
            <i className="fa fa-dollar icon" aria-hidden="true"></i>
          </div>
          {/* <!--Payment Details End--> */}

          <div className="input_group">
            <div className="input_box">
            <button type="button" onClick={handleCreateOrder}>
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
