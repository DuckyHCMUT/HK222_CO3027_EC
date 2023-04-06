import styled from "styled-components";
import Products from "../Products/Products";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 200px;
    margin-right: 200px;
    align-items: center;
    justify-content: center;
`;

const CategoryText = styled.h2`
    margin-left: 200px;
    margin-right: 200px;
    margin-bottom: 10px;
`;

const SearchedContent = ({ value }) => {
    return (
        <div>

            <CategoryText>
                Result for: {value}
            </CategoryText>
            <Container>
                <Products query={value} />
            </Container>
        </div>
    )
};

export default SearchedContent;