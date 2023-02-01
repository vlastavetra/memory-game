import { createContext, useState } from "react";
import axios from "axios";
const Context = createContext();

function Provider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [loginUser, setLoginUser] = useState(token && true);
  
  const getUserInfos = async () => {
  const headerConfig = { headers: { Authorization: `Bearer ${token}` } };
 
      const userInfos = await axios.get(
        `http://localhost:8080/user/${userId}`,
        headerConfig
      );
      setCurrentUser(userInfos.data);
     
   
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
