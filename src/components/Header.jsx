import {
    ShoppingCartOutlined,
    PhoneOutlined,
    AccountCircleOutlined,
    LocalOfferOutlined,
    LocationOnOutlined
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
    height: 100%;
    ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #33bfbf;
    ${mobile({ padding: "10px 0px" })}
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
    text-decoration: none;
    display: inline-block;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 30px;
    margin-right: 30px;
    padding: 4px;
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
    color: black;
    ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
    font-size: 18px;
    cursor: pointer;
    margin-left: 15px;
    text-align: center;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const LoginWrapper = styled.div`
    background: rgba(255, 247, 247, 0.6);
    margin-left: 25px;
    padding: 10px;
    display: flex;
    text-align: center;
    border: 1px solid #000000;
    border-radius: 10px;
`

const Header = ({ onChange }) => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('perfume'); // Fetched the searched item successfully

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link style={{ textDecoration: 'none' }}
                        to="/BlankPage">
                        <Logo>Store</Logo>
                    </Link>
                </Left>
                <Center>
                    <form action="/" method="get">
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
                                <SearchButton type="submit" onClick={onChange(!query ? '' : query)}> {/* After pressing this button, the query will already hold the searched value*/}
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
                    <Link to="/user/cart"
                        style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                        <MenuItem>
                            <ShoppingCartOutlined />
                            Cart
                        </MenuItem>
                    </Link>
                    <Link
                        to="/user/login"
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