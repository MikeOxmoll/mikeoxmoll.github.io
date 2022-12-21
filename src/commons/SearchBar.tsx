import React from 'react';
import {ReactComponent as SearchIcon} from '../SearchIcon.svg'
const SearchBar:React.FC = (props) => {
    return (
        <div className={"bg-secWhite/5 h-fit flex space-x-3 items-center rounded-md max-w-[623px] flex-grow py-1 px-5"}>
            <SearchIcon className={"h-4 w-4"}/>
            <span className={"text-secWhite/40 text-sm"}>Search BouffonHub</span>
        </div>
    );
}

export default SearchBar;