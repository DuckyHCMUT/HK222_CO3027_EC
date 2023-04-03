import styled from "styled-components";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";
import apiKey from "../api/ApiKey";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {
    const [item, setItem] = useState([]);

    useEffect(() => {
        axios.get(apiKey)
            .then((response) => {
                setItem(response.data);
                console.log(response.data.items);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const valueList = (
        item.items ? (
            <div>
                <Container>
                    {item.items.map((item) => (
                        <ProductCard item={item} />
                    ))}
                </Container>
            </div>
        ) : 'Product is loading'
    );

    return (
        <div>
            {valueList}
        </div>
    );
};

export default Products;
