import styled from "styled-components";
import { formatPrice } from "../../utility/utility";

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    border: 0.5px solid black;
    border-radius: 10px;
    padding: 5px 5px 10px 10px;
    margin-bottom: 20px;
    margin-right: 20px;
`;

const ProductDetail = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
`;

const Image = styled.img`
    width: 100px;
    height: 100px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span``;
const ProductOption = styled.span``;
const ProductColor = styled.span``;

const ProductAmountContainer = styled.div`
    display: flex;
    position: relative;
    margin-left: auto;
    align-items: flex-start;
`;

const AmountButton = styled.button`
	border: 0;
	text-decoration: none;
	border-radius: 10px;
	background-color: white;
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
const ProductPrice = styled.div`
    font-size: 15px;
    color: red;
`;

const CartItem = ({ item }) => {
    const handleCount = (quantity, option) => {

    }

    return (
        <Product>
            <ProductDetail>
                <Image src={item.image} />
                <Details>
                    <ProductName>
                        <b>Name:</b> {item.name}
                    </ProductName>
                    <ProductOption>
                        <b>Storage:</b> {item.storageOption}
                    </ProductOption>
                    <ProductColor>
                        <b>Color:</b> {item.colorOption}
                    </ProductColor>
                    <ProductPrice>
                        <b>Price: </b> {formatPrice(item.price)}
                    </ProductPrice>
                </Details>
                <ProductAmountContainer>
                    <AmountButton onClick={() => handleCount(0, item.optionId)}>Remove</AmountButton>
                    <AmountButton onClick={() => handleCount(item.quantity - 1, item.optionId)}>-</AmountButton>
                    <AmountButton>{item.quantity}</AmountButton>
                    <AmountButton onClick={() => handleCount(item.quantity + 1, item.optionId)}>+</AmountButton>
                </ProductAmountContainer>
            </ProductDetail>
        </Product>
    );
}

export default CartItem;