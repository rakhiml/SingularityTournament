import CreateTournament from "./components/CreateTournament";
import Header from "./components/header";
import Tournaments from "./components/Tournaments";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="BodyImage">
        <div className="hover"></div>
        <img
          src="https://ustroim-prazdnik.info/_ph/34/2/72139923.jpg?1567752161"
          alt="command picture"
        />
      </div>

      <div className="mainPageTitle">
        <h2>Tournaments</h2>
      </div>
      <CreateTournament />
      <Tournaments />
    </div>
  );
}

export default App;
