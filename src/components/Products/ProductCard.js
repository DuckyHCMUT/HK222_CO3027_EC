import styled from "styled-components";
import { Link } from "react-router-dom";

import { formatPrice } from "../../utility/utility";


const ItemInfo = styled.div`
    opacity: 100;
    width: 100%;
    height: 100%;
    z-index: 4;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const Container = styled.div`
    flex: 3;
    margin: 5px 0px 5px 0px;
    border-radius: 10px;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15);
    min-width: 280px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const Image = styled.img`
    display: block;
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px;
    transition: all 0.5s ease;
    &:hover {
		background-color: #e9f5f5;
		transform: scale(1.1);
    }
`;

const Name = styled.div`
    margin: 5px 5px 0px 5px;
    font-size: 14px;
    font-weight: bold;
    display: inline-block;
    position: relative;
    z-index: 10;
`;

const Price = styled.div`
    margin-top: 10px;
    margin-left: 10px;
    font-size: 16px;
    color: red;
    font-weight: bold;
    align-items: left;
`;

const ProductCard = ({ item }) => {
	return (
		<Link to={`/products/${item._id}`}
			style={{ color: "inherit", textDecoration: "inherit" }}>
			<Container>
				<ItemInfo>
					<Name>
						{item.name}
					</Name>
				</ItemInfo>
				<Image src={item.imgUrl} />
				<ItemInfo>
					<Price>
						{formatPrice(item.price)}
					</Price>
				</ItemInfo>
			</Container >
		</Link>
	);
};

export default ProductCard;
