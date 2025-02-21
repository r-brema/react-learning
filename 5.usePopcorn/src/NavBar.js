import Logo from "./Logo";
import Search from "./Search";
import NumResult from "./NumResult";
function NavBar({ moviesCount, searchText, setSearchText }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search searchText={searchText} setSearchText={setSearchText} />
      <NumResult moviesCount={moviesCount} />
    </nav>
  );
}

export default NavBar;
