import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const TopTexts = styled.span`
  cursor: pointer;
  margin: 10px;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 2px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid black;
  border-radius: 10px;
  padding: 20px;
  height: 30vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  border-radius: 10px;
  font-size: 18px;
  padding: 10px;
  background-color: #b52141;
  color: white;
  font-weight: 900;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Cart = () => {
    const [searchValue, setSearchValue] = useState('');
    const handleSearch = (val) => {
        setSearchValue(val);
    };

    return (
        <div>
            <Header onChange={handleSearch} />
            <Container>
            <TopTexts><Link to="/">Home</Link> {'>'} <Link to="/cart">Cart</Link></TopTexts>
                <Wrapper>
                    <Bottom>
                        <Info>
                            <Hr />
                        </Info>
                        <Summary>
                            <SummaryTitle>SUMMARY</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Items:</SummaryItemText>
                                <SummaryItemPrice>{0}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText> Total </SummaryItemText>
                                <SummaryItemPrice> {0} </SummaryItemPrice>
                            </SummaryItem>
                            <Link to="/">
                                <Button> CHECK OUT </Button>
                            </Link>
                            <Link to="/">
                                <Button> CHOOSE ANOTHER PRODUCT </Button>
                            </Link>
                        </Summary>
                    </Bottom>
                </Wrapper>
            </Container>
        </div>
    );
};

export default Cart;
