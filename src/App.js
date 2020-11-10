import SearchStyle from "./SearchStyle.css";
import Search from "./components/Search";


function App() {
  return (
    <div className="ui container">
      <header className="ui container">
        <h1 className="ui center aligned header">
            <i className="wikipedia w icon"></i>
          <div className="content">
              Find with Wiki
          </div>
        </h1>
      </header>
    <Search />
    </div>
  );
}

export default App;
