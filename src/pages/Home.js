import Header from "../components/Header";
import Content from "../components/Content";
import { useState } from "react";

const Home = () => {
    const [searchValue, setSearchValue] = useState('');
    const handleSearch = (val) => {
        setSearchValue(val);
    };

    return (
        <div>
            <Header onChange = {handleSearch} />
            <Content/>
        </div>
    );
};

export default Home;