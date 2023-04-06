import styled from "styled-components";
import Products from "./Products/Products";

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

const Display = styled.div`
    align-items: center;
    justify-content: center;
`;

const Content = () => {
    return (
        <div>
            <CategoryText>
                Featured phones
            </CategoryText>
            <Container>
                <Products query={''} />
            </Container>
        </div>
    )
};

export default Content;