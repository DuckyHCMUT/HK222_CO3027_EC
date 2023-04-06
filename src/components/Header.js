import {
    ShoppingCartOutlined,
    PhoneOutlined,
    AccountCircleOutlined,
    LocalOfferOutlined,
    LocationOnOutlined
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
    flex: 1;
    display: flex;
    align-items: center;
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
    width: 100%;
`;

const Input = {
    border: '0.5px solid white',
    borderRadius: "5px 0px 0px 5px",
    width: '90%'
};

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.h2`
    font-weight: bold;
    cursor: pointer;
    color: white;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const MenuItem = styled.div`
    font-size: 18px;
    height: fit-content;
    color: white;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    margin: 0px 15px 0px 15px;
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
`

const Header = () => {
const Header = () => {
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
                            <Right>
                                <SearchButton type="submit">
                                <SearchButton type="submit">
                                    Search
                                </SearchButton>
                            </Right>
                        </SearchContainer>
                    </form>
                </Center>
                <Right>
                    <MenuItem>
                        <PhoneOutlined />
                        Contact
                    </MenuItem>
                    <MenuItem>
                        <LocationOnOutlined />
                        Stores
                    </MenuItem>
                    <MenuItem>
                        <LocalOfferOutlined />
                        Promotion
                    </MenuItem>
                    <Link to="/cart"
                        style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                        <MenuItem>
                            <ShoppingCartOutlined />
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
                                <AccountCircleOutlined />
                                Login
                            </LoginWrapper>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Header;