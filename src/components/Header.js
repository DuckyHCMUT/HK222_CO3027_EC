import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import styled from "styled-components";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../utility/utility";
import { useState } from 'react';

const Container = styled.div`
    height: 100%;
`;

const Wrapper = styled.div`
    padding: 0px 200px 0px 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: linear-gradient(135deg,rgb(12, 97, 254) 0%, rgb(6, 63, 164) 100%);
    position: sticky;
`;

const Left = styled.div`
    display: flex;
    align-items: center;
    margin-right: 300px;
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 100px;
`;

/**
 * For search button
*/
const SearchButton = styled.button`
    background-color: rgba(255, 255, 255, 0.2);
    padding: 0.5px 8px;
    text-align: center;
    color: white;
    text-decoration: none;
    display: inline-block;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 30px;
    width: 100%;
`;

const Input = {
    border: '0.5px solid white',
    borderRadius: "5px 0px 0px 5px",
    width: '90%'
};

const Logo = styled.h2`
    font-weight: bold;
    cursor: pointer;
    color: white;
`;

const MenuItem = styled.div`
    font-size: 18px;
    height: fit-content;
    color: white;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const LoginWrapper = styled.div`
    background: rgba(255, 247, 247, 0.6);
    color: black;
    padding: 10px;
    display: flex;
    text-align: center;
    border: 1px solid #000000;
    border-radius: 10px;
`;

const DropDownContainer = styled.div`
    font-size: 1em; 
    font-weight: 400; 
    position: absolute; 
    top: 85%; 
    z-index: 20; 
    display: block; 
    left: auto; 
    min-width: 10rem;
    border-radius: 10px;
    border: 1px solid #000000; 
    background: rgba(255, 247, 247, 0.6);
`;

const Dropdown = styled.div`
    color: black;
    padding: 5px;
    border-bottom: 1px solid #000000; 
`;

const Hr = styled.hr`
    background-color: black;
`;


const NotLoggedInHeader = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link style={{ textDecoration: 'none' }}
                        to="/">
                        <Logo>Store</Logo>
                    </Link>
                </Left>
                <Center>
                    <form action="/searchResult/" method="get">
                        <SearchContainer>
                            <label htmlFor="header-search" />
                            <input
                                type="text"
                                id="header-search"
                                placeholder="Search item"
                                name="item"
                                style={Input}
                            />
                            <Center>
                                <SearchButton type="submit">
                                    Search
                                </SearchButton>
                            </Center>
                        </SearchContainer>
                    </form>
                </Center>
                <Right>
                    <MenuItem>
                        <LocalPhoneOutlinedIcon />
                        Contact
                    </MenuItem>
                    <MenuItem>
                        <LocationOnOutlinedIcon />
                        Stores
                    </MenuItem>
                    <MenuItem>
                        <LocalOfferOutlinedIcon />
                        Promotion
                    </MenuItem>
                    <Link to="/login"
                        style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                        <MenuItem>
                            <ShoppingCartOutlinedIcon />
                            Cart
                        </MenuItem>
                    </Link>
                    <Link
                        to="/login"
                        style={{
                            color: "inherit",
                            textDecoration: "inherit",
                        }}
                    >
                        <MenuItem>
                            <LoginWrapper>
                                <AccountCircleOutlinedIcon />
                                Login
                            </LoginWrapper>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    );
};

const LoggedInHeader = (user) => {
    let currentUser = JSON.parse(user);
    const [dropDownStatus, setDropDownStatus] = useState(false);

    const openDropDown = () => setDropDownStatus(!dropDownStatus);

    const handleLogout = () => {
        // Void the session
        sessionStorage.setItem('user', '{}');
        sessionStorage.setItem('token', '');
    
        // Immediately refresh the page
        window.location.reload();
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link style={{ textDecoration: 'none' }}
                        to="/">
                        <Logo>Store</Logo>
                    </Link>
                </Left>
                <Center>
                    <form action="/searchResult/" method="get">
                        <SearchContainer>
                            <label htmlFor="header-search" />
                            <input
                                type="text"
                                id="header-search"
                                placeholder="Search item"
                                name="item"
                                style={Input}
                            />
                            <Center>
                                <SearchButton type="submit">
                                    Search
                                </SearchButton>
                            </Center>
                        </SearchContainer>
                    </form>
                </Center>
                <Right>
                    <MenuItem>
                        <LocalPhoneOutlinedIcon />
                        Contact
                    </MenuItem>
                    <MenuItem>
                        <LocationOnOutlinedIcon />
                        Stores
                    </MenuItem>
                    <MenuItem>
                        <LocalOfferOutlinedIcon />
                        Promotion
                    </MenuItem>
                    <Link to="/cart"
                        style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                        <MenuItem>
                            <ShoppingCartOutlinedIcon />
                            Cart
                        </MenuItem>
                    </Link>
                    <MenuItem>
                        <LoginWrapper onClick={() => openDropDown()}>
                            <AccountCircleOutlinedIcon />
                            Welcome, {currentUser.name}!
                        </LoginWrapper>
                        {dropDownStatus ? (
                            <DropDownContainer>
                                <Dropdown>
                                    View orders
                                </Dropdown>
                                <Dropdown>
                                    View account
                                </Dropdown>
                                <Dropdown
                                    style={{ "border-bottom": "0px" }}
                                    onClick={() => handleLogout()}
                                >
                                    Log out
                                </Dropdown>
                            </DropDownContainer>
                        ) : null}
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    );
}

const Header = ({ user }) => {
    if (isLoggedIn(user)) {
        return LoggedInHeader(user);
    } else {
        return NotLoggedInHeader();
    }
};

export default Header;