import logo from "./logo.svg";
import "./App.css";
import Login from "./components/loginPage/Login";
import LoginScreen from "./screens/login screen/LoginScreen";
import Table from "./components/table/Table";
import Auto from "./components/autocomplete/Auto";
import AddInput from "./components/AddInput/AddInput";
import Header from "./components/header/Header";
import MainPage from "./screens/MainPage/MainPage";

function App() {
  return (
    <div>
      {/* <LoginScreen /> */}
      {/* <Auto /> */}
      {/* <AddInput /> */}
      <Header />
      <MainPage />
      {/* <Table /> */}
    </div>
  );
}

export default App;
