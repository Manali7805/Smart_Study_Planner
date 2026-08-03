import { createContext, useState } from "react";


export const AuthContext = createContext();


export function AuthProvider({ children }) {


  // ==========================
  // CURRENT USER
  // ==========================

  const [user, setUser] = useState(() => {

    const savedUser =
      localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;

  });



  // ==========================
  // REGISTER
  // ==========================

  const register = (userData) => {

    // Save registered user
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    return true;

  };



  // ==========================
  // LOGIN
  // ==========================

  const login = (email, password) => {

    const savedUser =
      localStorage.getItem("user");


    if (!savedUser) {

      return false;

    }


    const storedUser =
      JSON.parse(savedUser);


    // Check email and password
    if (
      storedUser.email === email &&
      storedUser.password === password
    ) {

      // Save logged-in user in state
      setUser(storedUser);


      // Keep user available after refresh
      localStorage.setItem(
        "user",
        JSON.stringify(storedUser)
      );


      return true;

    }


    return false;

  };



  // ==========================
  // LOGOUT
  // ==========================

  const logout = () => {

    localStorage.removeItem("user");

    setUser(null);

  };



  // ==========================
  // CONTEXT
  // ==========================

  return (

    <AuthContext.Provider
      value={{

        user,

        register,

        login,

        logout

      }}
    >

      {children}

    </AuthContext.Provider>

  );

}