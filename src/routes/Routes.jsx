import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { routes } from "./routes.data.js";
import NotFound from "../components/screens/not-found/Not-found.jsx";
import NotConfirmed from "../components/screens/not-confirmed/Not-confirmed.jsx";
import CalcPageK1 from "../components/screens/calculators/pages/CalcPageK1.jsx";
import CalcPageK2 from "../components/screens/calculators/pages/CalcPageK2.jsx"
import CalcPageK3 from "../components/screens/calculators/pages/CalcPageK3.jsx"
import HistoryPageK1 from "../components/screens/history/HistoryPageK1.jsx";
import UsersPage from "../components/screens/admin/pages/users/UsersPage.jsx";


const RouteGuard = ({ element, isAuth, user }) => {
  const location = useLocation();
  const currentRoute = routes.find((route) => route.path === location.pathname);

  if (!currentRoute) {
    return <NotFound />;
  }

  if (currentRoute.isAuth && !isAuth) {
    return <Navigate to="/auth" replace />;
  }

  if (currentRoute.isConfirmed && !user.decode.isConfirmed) {
    return <Navigate to="/not-confirmed" replace />;
  }
  if (currentRoute.isAdmin && !user?.decode?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return element;
};
const Router = () => {
  const { isAuth, user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <RouteGuard
                element={<route.component />}
                isAuth={isAuth}
                user={user}
              />
            }
          />
        ))}
				<Route path="/admin/users" element={<UsersPage />} />
        <Route path="/calculator/CalcPageK1" element={<CalcPageK1 />} />
        <Route path="/calculator/CalcPageK2" element={<CalcPageK2 />} />
				<Route path="/calculator/CalcPageK3" element={<CalcPageK3 />} />
        <Route path="/history/HistoryK1" element={<HistoryPageK1 />} />
        <Route path="/not-confirmed" element={<NotConfirmed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
