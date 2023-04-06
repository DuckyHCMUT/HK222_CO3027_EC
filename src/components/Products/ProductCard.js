import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";

const Info = styled.div`
    flex: 3;
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;

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
    margin: 5px 10px 5px 0px;
    border-radius: 10px;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15);
    min-width: 280px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    &:hover ${Info}{
      opacity: 1;
      border-radius: 10px;
    }
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
  `

const Price = styled.div`
    margin-top: 10px;
    margin-left: 10px;
    font-size: 16px;
    color: red;
    font-weight: bold;
    align-items: left;
  `

const ProductCard = ({ item }) => {
  function formatPrice(price) {
    return price.toLocaleString('vn-VN', {
      style: 'currency',
      currency: 'VND'
    });
  }

  return (
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
      <Info>
        <Icon onClick={() => alert("Added to cart")}>
          <ShoppingCartOutlined />
        </Icon>
        <Icon onClick={() => alert("Nothing")}>
          <SearchOutlined />
        </Icon>
        <Icon onClick={() => alert("Added to favorite")}>
          <FavoriteBorderOutlined />
        </Icon>

      </Info>
    </Container>
  );
};

export default ProductCard;
