import styled from "styled-components";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";
import apiKey from "../../api/ApiKey";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ query }) => {
    const [filteredItem, setFilteredItem] = useState([]);

    const filterOnSearchValue = (item) => {
        if (query !== '') {
            console.log('query = ', query);
            console.log(item.filter((item) => item["name"].toLowerCase().includes(query.toLowerCase())));
            return item.filter((item) => item["name"].toLowerCase().includes(query.toLowerCase()));
        } else {
            return item;
        }
    }

    useEffect(() => {
        axios.get(apiKey + '/items')
            .then(response => {
                setFilteredItem(filterOnSearchValue(response.data.data));
            })
            .catch(error => {
                console.log(error);
            });
    }, [query]);

    const valueList = (
        filteredItem ? (
            <div>
                <Container>
                    {filteredItem.map((item) => (
                        <ProductCard key={item._id} item={item} />
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