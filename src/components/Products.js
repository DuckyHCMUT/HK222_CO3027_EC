import styled from "styled-components";
import ProductCard from "./ProductCard";
import { all } from "../static/data";
import { useState, useEffect } from "react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {
    const [filter, setFilter] = useState([]);
    const checkFilter = () => {
        return all;
    }

    useEffect(() => {
        setFilter(checkFilter());
    }, []);

    const valueList = (
        filter ? (
            <Container>
                {filter.map((item) => (
                    <ProductCard item={item} />
                ))}
            </Container>)
            : 'Product is loading'
    );

    return (
        <div>
            {valueList}
        </div>
    );
};

export default Products;
