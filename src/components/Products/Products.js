import styled from "styled-components";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiKey } from "../../api/ApiKey";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    transition: all 0.5s ease;
`;

const Products = ({ value, category }) => {
    const [filteredItem, setFilteredItem] = useState([]);

    const filterOnSearchValue = (item) => {
        if (value !== '') {
            return item.filter((item) => item["name"].toLowerCase().includes(value.toLowerCase()));
        } else {
            return item;
        }
    }

    useEffect(() => {
        // Home page case
        if (value === '' && category === '') {
            console.log("Home page");
            axios.get(apiKey + 'items?category=' + category)
                .then(response => {
                    setFilteredItem(response.data.data);
                })
                .catch(error => {
                    console.log(error);
                });
        } else if (category) {
            console.log("Category page");
            axios.get(apiKey + 'items?category=' + category)
                .then(response => {
                    setFilteredItem(response.data.data);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            console.log("Search page");
            axios.get(apiKey + 'items')
                .then(response => {
                    setFilteredItem(filterOnSearchValue(response.data.data));
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, []);

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