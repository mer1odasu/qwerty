import Cookies from "js-cookie";
import { createContext, useState } from "react";
import { TOKEN } from "../app.constants";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  let decode = false;
  if (Cookies.get(TOKEN)) {
    const token = Cookies.get(TOKEN);
    decode = jwtDecode(token);
    console.log("decode", decode);
  }

  const [isAuth, setIsAuth] = useState(!!Cookies.get(TOKEN));
  const [user, setUser] = useState({ decode });
  console.log(user);
  console.log(isAuth);
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
