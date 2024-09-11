import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { routes } from "./routes.data.js";
import NotFound from "../components/screens/not-found/Not-found.jsx";
import CalcPage from "../components/screens/calculator/CalcPage/CalcPage.jsx";
import HistoryPage from "../components/screens/history/HistoryPage/HistoryPage.jsx";

const Router = () => {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
					if (route.isAuth && !isAuth) {
						return false;
          }
					
          return (
						<Route
						key={route.path}
						path={route.path}
						element={<route.component />}
            />
          );
        })}
				<Route path="/calculator/calcpage" element={<CalcPage />} />
				<Route path="/history/historypage" element={<HistoryPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
