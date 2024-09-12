import Admin from "../components/screens/admin/Admin";
import Calculator from "../components/screens/calculators/Calculator";
import History from "../components/screens/history/History";
import Home from "../components/screens/home/Home";
import NotConfirmed from "../components/screens/not-confirmed/Not-confirmed";
import SignIn from "../components/screens/signin/signin";
import SignUp from "../components/screens/signup/Signup";

export const routes = [
  {
    path: "/",
    component: Home,
    isAuth: false,
    isConfirmed: true,
    isAdmin: false,
  },
  {
    path: "/auth",
    component: SignIn,
    isAuth: false,
    isConfirmed: false,
    isAdmin: false,
  },
  {
    path: "/register",
    component: SignUp,
    isAuth: false,
    isConfirmed: false,
    isAdmin: false,
  },
  {
    path: "/history",
    component: History,
    isAuth: false,
    isConfirmed: true,
    isAdmin: false,
  },
  {
    path: "/admin",
    component: Admin,
    isAuth: false,
    isConfirmed: true,
    isAdmin: true,
  },
  {
    path: "/not-confirmed",
    component: NotConfirmed,
    isAuth: true,
    isConfirmed: false,
    isAdmin: false,
  },
  {
    path: "/calculator",
    component: Calculator,
    isAuth: false,
    isConfirmed: true,
    isAdmin: false,
  },
];
