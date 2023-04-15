import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Header from "../components/Header";
import { apiKey } from "../api/ApiKey";
import { formatPrice, isLoggedIn } from "../utility/utility";
import Swal from "sweetalert2";

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
    background: linear-gradient(90deg,#218adf,#f7cc97);
    width: 30em;
`;

const ProductImage = styled.img`
    display: block;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
`;

const ProductDescriptionWrapper = styled.div`
    margin: 20px;
`;

const ProductDescription = styled.span`
    display: flex;
    flex-direction: column;
    color: white;
`;

const ProductOptionContainer = styled.div`

`;

const ProductPrice = styled.div`
    color: #d70018;
    display: inline-block;
    font-size: 1.1em;
    font-weight: 700;
`;

const ProductOptionWrapper = styled.div`
    display: flex;
`;

const ProductOption = styled.a`
    border: 0;
    text-decoration: none;
    border-radius: 10px;
    border: 1px solid;
    font-size: 12px;
    cursor: pointer;
    padding: 10px;
    font-weight: bold;
    display: inline-block;
    margin: 5px;
    &:hover{
        background-color: #f8f4f4;
    }
`;

const ProductOptionImage = styled.img`
    max-height: 3em;
`;

const Button = styled.button`
    background-image: linear-gradient(to right, #314755 0%, #26a0da  51%, #314755  100%);
    margin: 10px 0px 0px 0px;
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

    const alertOnAddSuccess = (name, storage, color) => {
        let message = `<b>${name} (${storage}, ${color})</b> has been added to your cart.`;

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
            axios.post(apiKey + 'cart/' + user.id, {
                "productId": productId,
                "storageOption": selectedStorage.name,
                "colorOption": selectedColor.name,
                "quantity": 1
            }).then((response) => {
                console.log(response);
                if (response.status === 200 && response.data.msg === "Successful") {
                    alertOnAddSuccess(productInfo.name, selectedStorage.name, selectedColor.name);
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
                    setProductInfo(response.data.data);
                    setSelectedStorage(response.data.data.storage_options[0]);
                    setSelectedColor(response.data.data.color_options[0]);
                    setCurrentPrice(response.data.data.storage_options[0].price);
                } else {

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
                    Choose product storage capacity
                    <ProductOptionWrapper>
                        {productInfo.storage_options ? productInfo.storage_options.map((option) => (
                            <div>
                                <ProductOption
                                    key={option.name}
                                    value={option.name}
                                    onClick={() => handleStorageChange(option)}
                                    style={selectedStorage === option ? { "border": "2px solid red" } : null}
                                >
                                    {option.name}
                                    <hr />
                                    {formatPrice(option.price)}
                                </ProductOption>
                            </div>
                        )) : ""}
                    </ProductOptionWrapper>
                    Choose product color
                    <ProductOptionWrapper>
                        {productInfo.color_options ? productInfo.color_options.map((option) => (
                            <div>
                                <ProductOption
                                    key={option.name}
                                    value={option.name}
                                    onClick={() => handleColorChange(option)}
                                    style={selectedColor === option ? { "border": "2px solid red" } : null}>
                                    <ProductOptionImage src={option.variantImg} />
                                    {option.name}
                                    <hr />
                                    {formatPrice(selectedStorage.price)}
                                </ProductOption>
                            </div>
                        )) : ""}
                    </ProductOptionWrapper>
                    <Button onClick={() => handleAddToCart()}>Add to cart</Button>
                </ProductOptionContainer>
            </Container>
        </div>
    );
}

export default ProductDetail;