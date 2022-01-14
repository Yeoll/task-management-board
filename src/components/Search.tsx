import React from 'react';
import '../styles/AddCard.scss';

interface SearchProps {
    onSearch: (value: string) => void;
}
const Search: React.FC<SearchProps> = (props) => {
    return (
        <input
            className="Input"
            style={{ marginLeft: '50px' }}
            placeholder="Search"
            onChange={(e) => props.onSearch(e.target.value)}
        />
    );
};

export default Search;
