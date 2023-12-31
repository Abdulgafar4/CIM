/* eslint-disable react/prop-types */
import { Input } from "antd";

function SearchInput({ setSearchKeyword }) {
 
  const { Search } = Input;

  const handleSearch = value => {
    setSearchKeyword(value);
  };

  return (
    <Search
      placeholder="Search the table"
      onChange={(e) => handleSearch(e.target.value)}
      allowClear
      style={{ width: 200, marginBottom: 16 }}
    />
  );
}

export default SearchInput