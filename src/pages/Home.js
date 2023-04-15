import Header from "../components/Header";
import Content from "../components/Content";
import HomeTopBlock from "../components/HomeTopBlock";

const Home = () => {
    return (
        <div>
            <Header user={sessionStorage['user']} />
            <HomeTopBlock />
            <Content />
        </div>
    );
};

export default Home;