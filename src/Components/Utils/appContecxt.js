import React, { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const AppProvider = ({ children }) => {

  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const innerwidth = window.innerWidth

      if (innerwidth < 768) {
        setShow(true)
      } else {
        setShow(false)
      }
    };
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [window.innerWidth]);

  return (
    <UserContext.Provider value={{ show, setShow }}>
      {children}
    </UserContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(UserContext);
};

