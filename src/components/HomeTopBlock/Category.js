import styled from "styled-components";
import { Link } from "react-router-dom";

const CategoryBox = styled.div`
    align-items: center;
    color: #343a40;
    cursor: pointer;
    display: flex;
    line-height: 1.5;
    padding-left: 10px;
    padding-bottom: 5px;
    box-sizing: inherit;&:hover{
        background-color: #f8f4f4;
    }
`

const CategoryName = styled.span`
    align-items:center;
    font-size: 15px;
    font-weight: bold;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const Logo = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 5px;
`

const Icon = styled.img`
    width: 15px;
    height: 15px;
    margin-left: 20px;
    margin-right: 5px;
`

const Category = ({ icon, name }) => {
    return (
        <Link style={{ textDecoration: 'none' }}
            to="/">
            <CategoryBox>
                <Logo src={icon} />
                <CategoryName>
                    {name} 
                </CategoryName>
                <Right>
                    <Icon src="/icon/right-arrow.png" />
                </Right>
            </CategoryBox>
        </Link>
    );
};

export default Category;