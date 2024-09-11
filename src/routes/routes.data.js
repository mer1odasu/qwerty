import SignIn from "../components/screens/signin/signin";
import SignUp from "../components/screens/signup/Signup";
import Calculator from "../components/screens/calculator/Calculator";

export const routes = [
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
		component: Calculator,
		isAuth: false,
	},
];
