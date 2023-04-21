import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import styled from "styled-components";
import { Link } from "react-router-dom";
import { isAdmin, isLoggedIn } from "../utility/utility";
import { useState } from 'react';

const Container = styled.nav`
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
   
`;

const Center = styled.div`
    margin-left: 5vw;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-left: 3vw;
`;

/**
 * For search button
*/
const SearchButton = styled.button`
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    height: 3.8vh;
    border-radius: 0px 5px 5px 0px;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const Input = styled.input`
    border: 0.5px solid white;
    border-radius: 5px 0px 0px 5px;
    width: 25vw;
    height: 3vh;
`;

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
    background: linear-gradient(to right, rgb(210 230 144) 0%, rgb(142 203 232) 51%, rgb(105 212 201) 100%);
    color: black;
    padding: 10px;
    display: flex;
    text-align: center;
    border: 1px solid #000000;
    border-radius: 10px;
    &:hover{
        color: #ad134e;
        text-decoration: none;
    }
`;

const DropDownContainer = styled.div`
    font-size: 1em; 
    font-weight: 400; 
    position: absolute; 
    top: 85%; 
    z-index: -1; 
    min-width: 10rem;
    border-radius: 10px;
    border: 1px solid #000000; 
    background: rgba(255, 247, 247, 0.6);
    overflow: hidden;
`;

const Dropdown = styled.div`
    color: black;
    padding: 5px;
    background: linear-gradient(to right, rgb(210 230 144) 0%, rgb(142 203 232) 51%, rgb(105 212 201) 100%);
    border-bottom: 1px solid black;
    &:hover{
        color: #ad134e;
        text-decoration: none;
    }
`;

const NotLoggedInHeader = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link style={{ textDecoration: 'none' }}
                        to="/">
                        <Logo>Xoppie</Logo>
                    </Link>
                </Left>
                <Center>
                    <form action="/searchResult/" method="get">
                        <SearchContainer>
                            <Input
                                type="text"
                                id="header-search"
                                placeholder="Search item"
                                name="item"
                            />
                            <SearchButton type="submit">
                                Search
                            </SearchButton>
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
                        <MenuItem >
                            <LoginWrapper >
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
                        <Logo>Xoppie</Logo>
                    </Link>
                </Left>
                <Center>
                    <form action="/searchResult/" method="get">
                        <SearchContainer>
                            <Input
                                type="text"
                                id="header-search"
                                placeholder="Search item"
                                name="item"
                            />
                            <SearchButton type="submit">
                                Search
                            </SearchButton>
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
                            Welcome, {currentUser.name.length > 7 ? currentUser.name.slice(0, 7) + "..." : currentUser.name}!
                        </LoginWrapper>
                        {dropDownStatus ? (
                            <DropDownContainer>
                                {isAdmin(sessionStorage['user']) ? (<Link
                                    to="/manageOrders"
                                    style={{ "textDecoration": "inherit" }}>
                                    <Dropdown>Manage all orders</Dropdown>
                                </Link>) : (<Link
                                    to="/myOrders"
                                    style={{ "textDecoration": "inherit" }}>
                                    <Dropdown>View your orders</Dropdown>
                                </Link>)}

                                <Dropdown>
                                    View account
                                </Dropdown>
                                <Dropdown
                                    style={{ "borderBottom": "0px" }}
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