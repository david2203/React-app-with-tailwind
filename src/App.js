import logo from './logo.svg';
import './App.css';
import AppRoute from "./components/appRoute";
import API from "./components/API";

function App() {
  return (
    <div className="App">
      <AppRoute/>

      <API/>
    </div>
  );
}

export default App;
