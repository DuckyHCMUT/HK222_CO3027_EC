import styled from "styled-components";
import { Link } from "react-router-dom";

const CategoryBox = styled.div`
    align-items: center;
    color: #343a40;
    cursor: pointer;
    display: flex;
    font-size: 1em;
    font-weight: 400;
    line-height: 1.5;
    padding-left: 10px;
    box-sizing: inherit;
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
    width: 20px;
    height: 20px;
    margin-left: 20px;
    margin-right: 5px;
`

const Category = ({ icon, name }) => {
    return (
        <Link style={{ textDecoration: 'none' }}
            to="/">
            <CategoryBox>
                <Logo src={icon} /> {name}
                <Right>
                    <Icon src="/icon/right-arrow.png" />
                </Right>
            </CategoryBox>
        </Link>
    );
};

export default Category;