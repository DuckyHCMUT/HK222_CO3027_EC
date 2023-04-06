import styled from "styled-components";
import Products from "../Products/Products";

const Container = styled.div`
    height: 80%;
    width: 95%;
    display: flex;
    flex-direction: row;
    padding: 40px;
`;

const CategoryText = styled.h2`
    margin-bottom: 5px;
`;

const Display = styled.div`
    margin-left: 30px;
    margin-right: 50px;
    align-items: center;
    justify-content: center;
`;

const SearchedContent = ({ value }) => {
    return (
        <div>
            <Container>
                <Display>
                    <CategoryText>
                        Result for: {value}
                    </CategoryText>
                    <Products query={value} />
                </Display>
            </Container>
        </div>
    )
};

export default SearchedContent;