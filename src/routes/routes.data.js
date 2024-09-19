import Admin from "../components/screens/admin/Admin";
import UsersPage from "../components/screens/admin/pages/users/UsersPage";
import Calculator from "../components/screens/calculators/Calculator";
import CalcPageK1 from "../components/screens/calculators/pages/CalcPageK1";
import CalcPageK2 from "../components/screens/calculators/pages/CalcPageK2";
import CalcPageK3 from "../components/screens/calculators/pages/CalcPageK3";
import History from "../components/screens/history/History";
import HistoryPageK1 from "../components/screens/history/pages/HistoryPageK1";
import HistoryPageK2 from "../components/screens/history/pages/HistoryPageK2";
import Home from "../components/screens/home/Home";
import NotConfirmed from "../components/screens/not-confirmed/Not-confirmed";
import SignIn from "../components/screens/signin/Signin";
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
  {
    path: "/admin/users",
    component: UsersPage,
    isAuth: true,
    isConfirmed: true,
    isAdmin: true,
  },
  {
    path: "/calculator/CalcPageK1",
    component: CalcPageK1,
    isAuth: true,
    isConfirmed: true,
    isAdmin: false,
  },
  {
    path: "/calculator/CalcPageK2",
    component: CalcPageK2,
    isAuth: true,
    isConfirmed: true,
    isAdmin: false,
  },
  {
    path: "/calculator/CalcPageK3",
    component: CalcPageK3,
    isAuth: true,
    isConfirmed: true,
    isAdmin: false,
  },
  {
    path: "/history/HistoryK1",
    component: HistoryPageK1,
    isAuth: true,
    isConfirmed: true,
    isAdmin: false,
  },
  {
    path: "/history/HistoryK2",
    component: HistoryPageK2,
    isAuth: true,
    isConfirmed: true,
    isAdmin: false,
  },
];
