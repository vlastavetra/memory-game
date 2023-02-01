import { createContext, useState } from "react";
import axios from "axios";
const Context = createContext();

function Provider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const [loginUser, setLoginUser] = useState(false);
  const userId = localStorage.getItem("userId");
  
  const getUserInfos = async () => {
    const token = localStorage.getItem("token");
    const headerConfig = { headers: { Authorization: `Bearer ${token}` } };
    try {
      const res = await axios.get(
        `http://localhost:8080/user/${userId}`,
        headerConfig
      );
      console.log(res.data);
      console.log('hi im the context');
     
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  const valueToShare = {
    currentUser,
    setCurrentUser,
    toggleModal,
    setIsOpen,
    isOpen,
    openLoginModal,
    setOpenLoginModal,
    loginUser,
    setLoginUser,
    getUserInfos
  };


  return <Context.Provider value={valueToShare}>{children}</Context.Provider>;
}
export { Provider };
export default Context;
