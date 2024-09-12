import Cookies from "js-cookie";
import { TOKEN } from "../app.constants";
import { $axios } from "../api";

class AuthService {
  async login(login, password) {
    try {
      const { data } = await $axios.post("/user/signin", {
        login,
        password,
      });
      if (data.token) Cookies.set(TOKEN, data.token);
      console.log(data);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async register(login, password, email, name, patronymic, surname) {
    try {
      const { data } = await $axios.post("/user/signup", {
        login,
        password,
        email,
        name,
        patronymic,
        surname,
      });
      if (data.token) Cookies.set(TOKEN, data.token);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new AuthService();
