import { $axios } from "../api";

class adminService {
  async getAllUsers() {
    return await $axios.get("/admin");
  }
}

export default new adminService();
