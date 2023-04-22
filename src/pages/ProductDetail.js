import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Header from "../components/Header";
import { apiKey } from "../api/ApiKey";
import { formatPrice, isLoggedIn } from "../utility/utility";
import Swal from "sweetalert2";

import { List } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    minWidth: '10rem',
    maxWidth: '40rem',
    width: '40rem',
    minHeight: '10rem',
    maxHeight: '40rem',
    height: '25rem',
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 1,
    marginLeft: '1vw',
    fontSize: '1rem',
    display: 'inline-block'
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 200px;
    margin-right: 200px;
`;

const ProductName = styled.h2`
    font-size : 20px;
    display: flex;
    flex-direction: row;
    margin-left: 200px;
    margin-right: 200px;
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 2px;
    margin-left: 200px;
    margin-right: 200px;
`;

const ProductImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15);
    border-radius: 10px;
    margin-top: 5px;
    margin-right: 20px;
    background: linear-gradient(90deg, rgb(33, 138, 223), rgb(33 70 70));
    min-width: 10rem;
    max-width: 40rem;
    width: 40rem;
    min-height: 10rem;
    max-height: 40rem;
    height: 25rem;
    overflow: hidden;
`;

const ProductImage = styled.img`
    display: block;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
    overflow: hidden;
`;

const ProductDescriptionWrapper = styled.div`
    margin: 20px;
`;

const ProductDescription = styled.span`
    display: flex;
    flex-direction: column;
    color: white;
    line-height: 1.4;
    font-size: 0.8rem;
`;

const ProductOptionContainer = styled.div`
    min-width: 10rem;
    max-width: 40rem;
    width: 40rem;
    min-height: 10rem;
    max-height: 40rem;
    height: 25rem;
`;

const ProductPrice = styled.div`
    color: #d70018;
    display: inline-block;
    font-size: 1.1em;
    font-weight: 700;
`;

const ProductOptionWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 0.5em;
    margin-top: 0.5rem;
`;

const StorageOption = styled.div`
    border-radius: 10px;
    border: 1px solid #bfbbbb;
    font-size: 12px;
    cursor: pointer;
    padding: 1em;
    font-weight: bold;
    display: flex;
    min-height: 1rem;
    max-height: 2rem;
    min-width: 6.5rem;
    max-width: 7rem;
    transition: ease-out 0.3s;
    overflow: hidden;
    &:hover{
        background-color: #97ebf0;
        transition: ease-out 0.3s;
    }
`;

const ColorOption = styled.div`
    border-radius: 10px;
    border: 1px solid #bfbbbb;
    font-size: 12px;
    cursor: pointer;
    padding: 1em;
    font-weight: bold;
    display: flex;
    height: 1.5rem;
    min-height: 1rem;
    max-height: 2rem;
    width: 6.7rem;
    min-width: 6.5rem;
    max-width: 7rem;
    transition: ease-out 0.3s;
    overflow: hidden;
    &:hover{
        background-color: #97ebf0;
        transition: ease-out 0.3s;
    }
`;

const ProductOptionImage = styled.img`
    max-height: 3em;
    margin-right: 0.2vw;
`;

const Button = styled.button`
    background-image: linear-gradient(to right, #314755 0%, #26a0da 51%, #314755 100%);
    width: 100%;
    padding: 15px 45px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;            
    box-shadow: 0 0 20px #eee;
    font-size: 18px;
    border-radius: 10px;
    cursor: pointer;;
    display: block;
    &:hover{
        background-position: right center; /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
    }
`;


const ProductDetail = () => {
    const { productId } = useParams();
    const [currentPrice, setCurrentPrice] = useState(0);
    const [productInfo, setProductInfo] = useState({});
    const [selectedStorage, setSelectedStorage] = useState({});
    const [selectedColor, setSelectedColor] = useState({});
    const [storageOptions, setStorageOptions] = useState();
    const [colorOptions, setColorOptions] = useState();

    const handleStorageChange = (option) => {
        setSelectedStorage(option);
        setCurrentPrice(option.price);
    }

    const handleColorChange = (option) => {
        setSelectedColor(option);
    }

    const alertOnNotLoggedIn = () => {
        Swal.fire({
            title: 'Login required!',
            text: "Please login before adding this item to your cart.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login now'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location = "/login";
            }
        });
    }

    const alertOnAddSuccess = (name, storage = '', color = '') => {
        let message;

        if (storage === '' && color === '') {
            message = `<b>${name}</b> has been added to your cart.`;
        } else if (storage === '' && color !== '') {
            message = `<b>${name} (${color})</b> has been added to your cart.`;
        } else if (storage !== '' && color === '') {
            message = `<b>${name} (${storage})</b> has been added to your cart.`;
        } else {
            message = `<b>${name} (${storage}, ${color})</b> has been added to your cart.`;
        }

        Swal.fire({
            title: 'Success!',
            icon: 'success',
            html: message,
            showCancelButton: true,
            cancelButtonText: 'I want to checkout',
            cancelButtonColor: '#fe9800',
            showConfirmButton: true,
            confirmButtonText: 'I want to buy more',
            confirmButtonColor: '#0d82cc',
            focusConfirm: true
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                window.location = ('/cart');
            }
        });
    }

    const alertOnAddFailed = (error) => {
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Something went wrong while adding to cart!'
        }).then((error) => {
            console.log(error);
        });
    }

    const handleAddToCart = () => {
        if (!isLoggedIn(sessionStorage['user'])) {
            // Alert prompting the user to login first
            alertOnNotLoggedIn();
        } else {
            let user = JSON.parse(sessionStorage['user']);

            let body = {
                "productId": productId,
                "quantity": 1
            }

            if (storageOptions.length) {
                body["storageOption"] = selectedStorage.name
            }
            if (colorOptions.length) {
                body["colorOption"] = selectedColor.name
            }

            axios.post(apiKey + 'cart/' + user.id, body).then((response) => {
                console.log(response);
                if (response.status === 200 && response.data.msg === "Successful") {
                    alertOnAddSuccess(
                        productInfo.name,
                        storageOptions.length ? selectedStorage.name : '',
                        colorOptions.length ? selectedColor.name : ''
                    );

                } else {
                    alertOnAddFailed(response);
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    useEffect(() => {
        axios.get(apiKey + 'item/' + productId)
            .then((response) => {
                if (response.status === 200 && response.data.msg === "Successful") {
                    console.log(response.data.data);

                    // Set common information
                    setProductInfo(response.data.data);
                    setStorageOptions(response.data.data.storage_options);
                    setColorOptions(response.data.data.color_options);

                    if (response.data.data.storage_options.length === 0) {
                        setCurrentPrice(response.data.data.price);
                        setSelectedColor(response.data.data.color_options[0]);
                    } else {
                        setCurrentPrice(response.data.data.storage_options[0].price);
                        setSelectedStorage(response.data.data.storage_options[0]);
                        setSelectedColor(response.data.data.color_options[0]);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <Header user={sessionStorage['user']}></Header>
            <ProductName> {productInfo.name ? productInfo.name : "Loading..."} </ProductName>
            <Hr />
            <Container>
                <ProductImageContainer>
                    <ProductImage src={productInfo.imgUrl} />
                    <ProductDescriptionWrapper>
                        {productInfo.descriptions ? productInfo.descriptions.map((desc) => (
                            <ProductDescription key={desc}>{"• " + desc}</ProductDescription>
                        )) : ""}
                    </ProductDescriptionWrapper>
                </ProductImageContainer>
                <ProductOptionContainer>
                    <ProductPrice>
                        {currentPrice ? formatPrice(currentPrice) : formatPrice(99999999)}
                    </ProductPrice>
                    <br />
                    {!storageOptions ?
                        (<center>
                            <CircularProgress color="secondary" />
                        </center>) : storageOptions.length === 0 ? null : (
                            <div>
                                <ProductOptionWrapper>
                                    Choose product storage capacity
                                    {productInfo.storage_options.map((option) => (
                                        <div>
                                            <StorageOption
                                                key={option.name}
                                                value={option.name}
                                                onClick={() => handleStorageChange(option)}
                                                style={selectedStorage === option ? { "border": "1px solid red" } : null}
                                            >
                                                {option.name}
                                                <br />
                                                {formatPrice(option.price)}
                                            </StorageOption>
                                        </div>
                                    ))}
                                </ProductOptionWrapper>
                                <hr />
                            </div>
                        )
                    }
                    {!colorOptions ? (
                        <center>
                            <CircularProgress color="secondary" />
                        </center>
                    ) : colorOptions.length === 0 ? null : (
                        <div>
                            Choose product color
                            <ProductOptionWrapper>
                                {productInfo.color_options.length > 0 ? productInfo.color_options.map((option) => (
                                    <div>
                                        <ColorOption
                                            key={option.name}
                                            value={option.name}
                                            onClick={() => handleColorChange(option)}
                                            style={selectedColor === option ? { "border": "1px solid red" } : null}>
                                            <ProductOptionImage src={option.variantImg} />
                                            {option.name} <br />
                                            {formatPrice(currentPrice)}
                                        </ColorOption>
                                    </div>
                                )) : null}
                            </ProductOptionWrapper>
                            <hr />
                        </div>
                    )}
                    <Button onClick={() => handleAddToCart()}>Add to cart</Button>
                </ProductOptionContainer>
                <List sx={style} component="nav" aria-label="status_options">
                    <ListItem sx={{}} divider>
                        Product status
                    </ListItem>
                    <br />
                    {productInfo.status_options ? productInfo.status_options.map((option) => {
                        return (
                            <div>
                                <ListItem key={option} sx={{ paddingTop: 0, paddingBottom: 0 }}>
                                    <Typography variant="body2" gutterBottom>
                                        • {option}
                                    </Typography>
                                </ListItem>
                            </div>
                        )
                    }) : ""}
                </List>
            </Container>
        </div>
    );
}

export default ProductDetail;