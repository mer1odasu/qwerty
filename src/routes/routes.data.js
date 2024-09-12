import SignIn from "../components/screens/signin/signin";
import SignUp from "../components/screens/signup/Signup";
import Calculator from "../components/screens/calculator/Calculator";
import History from "../components/screens/history/History";
import Admin from "../components/screens/admin/Admin";

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
	{
		path: '/history',
		component: History,
    isAuth: false,
	},
	{
		path: '/admin',
		component: Admin,
    isAuth: false,
	}
];
