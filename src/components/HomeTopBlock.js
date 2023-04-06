import styled from "styled-components";
import Slider from "./Slider";
import Category from "./HomeTopBlock/Category";

const Container = styled.div`
    margin: 15px 200px 30px 200px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`

const CategoryWrapper = styled.div`
    margin-right: 15px;
    border-radius: 10px;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15);
    display: block;
    overflow: hidden;
`

const HomeTopBlock = () => {
    return (
        <Container>
            <CategoryWrapper>
                <Category icon={"/icon/phone.svg"} name={"Phone"} />
                <Category icon={"/icon/accessories.svg"} name={"Accessories"} />
                <Category icon={"/icon/phone.svg"} name={"Phone"} />
                <Category icon={"/icon/accessories.svg"} name={"Accessories"} />
            </CategoryWrapper>
            <Slider />
        </Container>
    );
}

export default HomeTopBlock;