import axios from 'axios';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';

import Header from "../../components/Header";
import { apiKey } from '../../api/ApiKey';
import { formatPrice } from "../../utility/utility";
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './payment_style.css';

const Payment = () => {
	const [cart, setCart] = useState({});
	const [shippingInfo, setShippingInfo] = useState({});
	const [paymentOption, setPaymentOption] = useState('cod');

	let currentUser = JSON.parse(sessionStorage['user']);

	const handleCreateOrder = async () => {
		// Block the submission process if any input field is empty
		if (!(shippingInfo.name && shippingInfo.contact && shippingInfo.address)) {
			Swal.fire({
				title: 'Failed',
				html: 'Please fill out all fields',
				timer: 3000,
				icon: 'error',
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'Got it'
			})
			return;
		}

		if (paymentOption === 'cod') {
			//Create the order here 
			const userId = currentUser.id;
			var items = cart.items.map(item => {
				return {
					quantity: item.quantity,
					image: item.image,
					productId: item.productId,
					name: item.name,
					colorOption: item.colorOption,
					storageOption: item.storageOption,
					price: item.price
				}
			});

			var body = {
				userId: userId,
				items: items,
				shippingInfo: shippingInfo,
				bill: cart.bill,
				status: "open"
			}

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
					else {
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
					console.log("error", error);
					Swal.fire({
						title: 'Order',
						text: error.message,
						icon: 'error',
						confirmButtonColor: '#3085d6',
						confirmButtonText: 'Let me try again'
					});
				});
		} else {
			const userId = currentUser.id;
			var items = cart.items.map(item => {
				return {
					quantity: item.quantity,
					image: item.image,
					productId: item.productId,
					name: item.name,
					colorOption: item.colorOption,
					storageOption: item.storageOption,
					price: item.price
				}
			});

			var body = {
				userId: userId,
				items: items,
				shippingInfo: shippingInfo,
				bill: cart.bill,
				status: "open"
			}

			await axios.post(apiKey + 'order', body).then().catch();

			body = {
				orderInfo: "Thanh toán hóa đơn của " + currentUser.name,
				amount: cart.bill.toString(),
			}

			await axios.post(apiKey + 'momoCheckout', body)
				.then((res) => {
					if (res.status === 200 && res.data.localMessage === "Thành công") {
						// Order created successfully
						Swal.fire({
							title: 'Redirecting to MoMo payment gateway...',
							html: res.data.payUrl,
							timer: 3000,
							icon: 'success',
						}).then(() => {
							if (res.data.payUrl) {
								window.open(res.data.payUrl);
							}
						})
					}
					else {
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

	useEffect(() => {
		// Load payment info by default
		setShippingInfo({
			name: currentUser.name,
			contact: currentUser.email
		});

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
								defaultValue={currentUser ? currentUser.name : ""}
								onChange={(e) => {
									setShippingInfo({
										...shippingInfo,
										name: e.target.value
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
								defaultValue={currentUser ? currentUser.email : ""}
								onChange={(e) => {
									setShippingInfo({
										...shippingInfo,
										contact: e.target.value
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
										address: e.target.value
									})
								}}
							/>
							<i className="fa fa-map-marker icon" aria-hidden="true"></i>
						</div>
					</div>
					{/* <!--Payment Details Start--> */}
					<div className="input_group">
						<div className="input_box">
							<h4>Payment Details</h4>
							<input type="radio" name="pay" className="radio" id="bc1" checked={paymentOption === 'cod'} onChange={() => { setPaymentOption('cod') }} />
							<label htmlFor="bc1">
								<span>
									COD
								</span>
							</label>
							<input type="radio" name="pay" className="radio" id="bc2" checked={paymentOption === 'momo'} onChange={() => { setPaymentOption('momo') }} />
							<label htmlFor="bc2">
								<span>
									MOMO
								</span>
							</label>
						</div>
					</div>
					<div className="input_box">
						<input
							name="amount"
							readOnly
							placeholder="100"
							required
							className="name"
							value={cart.bill ? formatPrice(cart.bill) : formatPrice(99999999)}
						/>{" "}
						<i className="fa fa-dollar icon" aria-hidden="true"></i>
					</div>
					{/* <!--Payment Details End--> */}

					<div className="input_group">
						<div className="input_box">
							<button type="button" onClick={() => handleCreateOrder()}>
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