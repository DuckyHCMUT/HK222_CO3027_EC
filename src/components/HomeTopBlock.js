import styled from "styled-components";
import Slider from "./Slider";
import Category from "./HomeTopBlock/Category";

const Container = styled.div`
    margin: 15px 200px 30px 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const CategoryWrapper = styled.div`
    margin-right: 15px;
    border-radius: 10px;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15);
    width: 10vw;
    overflow: hidden;
`;

const AdvertisementWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Advertisement = styled.div`
    border-radius: 10px;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15);
    margin-right: auto;
    width: 20vw;
    height: 17vh;
`;

const AdvertisementImg = styled.img`
    width: 20vw;
    height: 17vh;
    object-fit: contain;
`;

const HomeTopBlock = () => {
    return (
        <Container>
            <CategoryWrapper>
                <Category icon={"/icon/apple.svg"} name={"Apple"}/>
                <Category icon={"/icon/nokia.svg"} name={"Nokia"}/>
                <Category icon={"/icon/oppo.png"} name={"Oppo"}/>
                <Category icon={"/icon/xiaomi.png"} name={"Xiaomi"}/>
                <Category icon={"/icon/samsung.png"} name={"Samsung"}/>
            </CategoryWrapper>
            <Slider />
            <AdvertisementWrapper>
                <Advertisement>
                    <AdvertisementImg src={"/promotion/promotion-1.jpg"}/>
                </Advertisement>
                <Advertisement>
                    <AdvertisementImg src={"/promotion/promotion-2.jpg"}/>
                </Advertisement>
            </AdvertisementWrapper>
        </Container>
    );
}

export default HomeTopBlock;