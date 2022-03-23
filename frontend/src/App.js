//import "./App.css";
import Landing from "./screen/landingPage/Landing";
import Form from "./screen/signup/form";
import Formuser from "./screen/signup/formUser";
import Login from "./screen/login/login";
import Weather from "./screen/weather/Weather";
import LoginAdmin from "./screen/login/loginadmin";

import Add from "./screen/addweather/add";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => (
  <BrowserRouter>
    <main>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/form" element={<Form />} />
        <Route path="/formuser" element={<Formuser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<Add />} />

        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
