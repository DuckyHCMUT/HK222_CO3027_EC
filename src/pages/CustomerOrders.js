import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import Header from "../components/Header";
import { apiKey } from "../api/ApiKey";
import CustomerOrder from "../components/Admin/CustomerOrder";
import { isLoggedIn } from "../utility/utility";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 200px;
    margin-right: 200px;
    align-items: center;
    justify-content: center;
`;

const HeaderText = styled.h2`
    margin: 30px 200px 20px 200px;
`;

const CustomerOrders = () => {
    const [allOrdersData, setAllOrdersData] = useState([]);

    // User information
    let currentUser = JSON.parse(sessionStorage['user']);

    useEffect(() => {
        axios.get(apiKey + 'order/' + currentUser.id)
            .then((response) => {
                if (response.status === 200 && response.data.msg === "Successful") {
                    setAllOrdersData(response.data.data);
                    console.log(response.data.data);
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);

    if (!isLoggedIn(sessionStorage['user'])) {
        window.location = "/login";
    } else {
        return (
            <div>
                <Header user={sessionStorage['user']} />
                <HeaderText>My past orders</HeaderText>
                <Container>
                    {allOrdersData ? allOrdersData.map((order) => (
                        <CustomerOrder key={order._id} order={order} />)) : "Loading..."}
                </Container>
            </div>
        );
    }
}

export default CustomerOrders;