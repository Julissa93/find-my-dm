import Login from "./Login";
import SignUp from "./SignUp";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) navigate("/mygames");
  }, []);

  return <Login></Login>;
};

export default Home;
