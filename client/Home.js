import Login from "./Login";
import SignUp from "./SignUp";
import { useContext } from "react";
import { UserContext } from "./UserContext";
const Home = () => {
  const { user } = useContext(UserContext);
    return <Login></Login>;
};

export default Home;
