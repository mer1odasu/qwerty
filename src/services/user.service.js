import { $axios } from "../api";

class userService {
  async getUserById(id) {
    return await $axios.get(`/user/${id}`);
  }
}

export default new userService();
