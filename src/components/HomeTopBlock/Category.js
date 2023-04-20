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
    padding-top: 5px;
    box-sizing: inherit;
    &:hover {
        transition: all 0.5s ease 0s;
        background-color: rgba(255, 0, 0, 0.2);
    }
`

const CategoryName = styled.div`
    align-items: center;
    font-size: 15px;
    font-weight: bold;
`

const Logo = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 5px;
    object-fit: contain;
`

const Icon = styled.img`
    width: 1vw;
    height: 2vh;
    margin-left: auto;
`

const Category = ({ icon, name }) => {
    const filterByCategory = () => {
        window.location = `searchResult/?branch=${name}`;
    }

    return (
        <Link style={{ textDecoration: 'none' }}
            to="/">
            <CategoryBox onClick={() => filterByCategory()}>
                <Logo src={icon} />
                <CategoryName>
                    {name}
                </CategoryName>
                <Icon src="/icon/right-arrow.png" />
            </CategoryBox>
        </Link>
    );
};

export default Category;