import styled from "styled-components";

import Header from "../components/Header";
import SearchedContent from "../components/SearchResult/SearchedContent";
import CategoryContent from "../components/SearchResult/CategoryContent";

const CategoryText = styled.h2`
    margin-left: 200px;
    margin-right: 200px;
    margin-bottom: 10px;
`;

const SearchResult = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('item');
    const categoryQuery = new URLSearchParams(search).get('branch');

    if (query) {
        return (
            <div>
                <Header user={sessionStorage['user']} />
                <CategoryText>
                    Result for: {query}
                </CategoryText>
                <SearchedContent value={query} />
            </div>
        );
    } else {
        return (
            <div>
                <Header user={sessionStorage['user']} />
                <CategoryText>
                    Category: {categoryQuery}
                </CategoryText>
                <CategoryContent category={categoryQuery} />
            </div>
        );

    }
};

export default SearchResult;