import { useQuery } from "react-query";
import { useAuth } from "../../../hooks/useAuth";
import userService from "../../../services/user.service";
import Layout from "../../layout/Layout.jsx";
import Loader from "../../ui/Loader.jsx";

const Home = () => {
  const { user } = useAuth();
  const { data, refetch, isLoading } = useQuery(
    ["get userInfo", user?.sub],
    () => userService.getUserById(user.decode.sub),
    {
      enabled: !!user?.sub,
      select: ({ data }) => data,
    }
  );

  return (
    <Layout>
      <h1>Home</h1>
      {isLoading && <Loader />}
      {data && <p>User Info: {JSON.stringify(data)}</p>}
      <button onClick={refetch}>Отправить запрос</button>
    </Layout>
  );
};
export default Home;
