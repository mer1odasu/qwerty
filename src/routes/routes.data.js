import { useMemo } from "react";
import SignIn from "../components/screens/signin/signin";
import SignUp from "../components/screens/signup/Signup";
import CiCalculator1 from 'react-icons/ci-calculator1';

export const routes = useMemo [
  {
    path: "/",
    component: SignIn,
    isAuth: false,
  },
  {
    path: "/register",
    component: SignUp,
    isAuth: false,
  },
	{
		path: "/calculator",
		icon: CiCalculator1,
		isAuth: false,
	},
];
