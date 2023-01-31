import { createContext, useState } from 'react';

const Context = createContext();

function Provider({ children }) {
  const [currentUser, setCurrentUser] = useState(
 {}
  );

  const [serverMessage, setServerMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const [loginUser, setLoginUser] = useState(false);

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
   
  };
  //   const getUserById = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8080/user/id");
  //       console.log(res)
  //     } catch (error) {
  //       alert(error);
  //     }
  //   };
  //   useEffect(()=> {
  //    getUserById()

  //   }, [])

  return <Context.Provider value={valueToShare}>{children}</Context.Provider>;
}
export { Provider };
export default Context;
