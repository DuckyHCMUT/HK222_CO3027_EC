import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import CartItem from "../components/Cart/CartItem";
import { formatPrice, isLoggedIn } from "../utility/utility";
import { apiKey } from "../api/ApiKey";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 200px;
    margin-right: 200px;
    align-items: flex-start;
`;

const CartWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TopTexts = styled.span`
    cursor: pointer;
    margin: 10px 200px 5px 200px;
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 2px;
    margin: 20px 200px 10px 200px;
`;

const Summary = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    border: 0.5px solid black;
    border-radius: 10px;
    padding: 20px;
    position: right;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const SummaryItem = styled.div`
    margin: 30px 0px 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    border-radius: 10px;
    font-size: 18px;
    padding: 10px;
    background-color: #b52141;
    color: white;
    margin-bottom: 10px;
    cursor: pointer;
`;

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [reloadCart, setReloadCart] = useState(false);

    // User information
    let currentUser = JSON.parse(sessionStorage['user']);

    const handleItemCount = (items) => {
        if (items.length === 0) {
            return 0;
        }
        if (items.length === 1) {
            return items[0].quantity;
        }
        return items.reduce(function (a, b) {
            return a + b['quantity'];
        }, 0);
    }

    useEffect(() => {
        axios.get(apiKey + 'cart/' + currentUser.id)
            .then(response => {
                console.log(response.data.data);
                if (response.data.msg === "Successful") {
                    let items = response.data.data.items;
                    let bill = response.data.data.bill;

                    setCartItems(items);
                    setTotalAmount(formatPrice(bill));
                    setTotalItemsCount(handleItemCount(items));
                } else if (response.data.msg === "Cart not found") {
                    setCartItems([]);
                    setTotalAmount(0);
                    setTotalItemsCount(0);
                } else {
                    alert("Get cart failed");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [reloadCart]);


    return (
        <div>
            <Header user={sessionStorage['user']} />
            <TopTexts><Link to="/">Home</Link> {'>'} <Link to="/cart">Cart</Link></TopTexts>
            <Hr />
            {!cartItems ? (<center>Your cart is currently empty</center>) : (
                <Container>
                    <CartWrapper>
                        {cartItems.map((item) => (
                            <CartItem key={item._id} item={item} reloadCart={() => setReloadCart(!reloadCart)} />))}
                    </CartWrapper>
                    <Summary>
                        <SummaryTitle>SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Items:</SummaryItemText>
                            <SummaryItemPrice> {totalItemsCount} </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText> Total </SummaryItemText>
                            <SummaryItemPrice> {totalAmount} </SummaryItemPrice>
                        </SummaryItem>
                        <Link to="/payment">
                            <Button> Checkout </Button>
                        </Link>
                        <Link to="/">
                            <Button> Choose another product</Button>
                        </Link>
                    </Summary>
                </Container>
            )}
        </div>
    );

};

export default Cart;
