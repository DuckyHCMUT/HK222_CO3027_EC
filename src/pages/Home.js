import Header from "../components/Header";
import Content from "../components/Content";
import HomeTopBlock from "../components/HomeTopBlock";

const Home = () => {
    if (sessionStorage.hasOwnProperty('user') === false){
        sessionStorage.setItem('user', '{}');
    }
    
    return (
        <div>
            <Header user = {sessionStorage['user']}/>
            <HomeTopBlock />
            <Content />
        </div>
    );
};

export default Home;