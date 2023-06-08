import logo from "./logo.svg";
import "./App.css";
import Login from "./components/loginPage/Login";
import LoginScreen from "./screens/login screen/LoginScreen";
import Table from "./components/table/Table";
import Auto from "./components/autocomplete/Auto";
import AddInput from "./components/AddInput/AddInput";
import Header from "./components/header/Header";
import MainPage from "./screens/MainPage/MainPage";
import NestedModal from "./components/Modal/Modal";

function App() {
  return (
    <div>
      <Header />
      <MainPage />
      {/* <NestedModal /> */}
    </div>
  );
}

export default App;
