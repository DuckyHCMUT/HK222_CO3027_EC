import Header from "../components/Header";
import SearchedContent from "../components/SearchResult/SearchedContent";

const SearchResult = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('item');

    return (
        <div>
            <Header user={sessionStorage['user']} />
            <SearchedContent value={query} />
        </div>
    );
};

export default SearchResult;