import { $axios } from "../api";

class HistoryService {
  async getHistoryByUserId(userId) {
    return await $axios.get(`user/${userId}/result/`);
  }
}

export default new HistoryService();
