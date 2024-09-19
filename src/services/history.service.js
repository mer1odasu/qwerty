import { $axios } from "../api";

class HistoryService {
  async getHistoryByUserId(userId, calculatorId) {
    return await $axios.get(`user/${userId}/result/${calculatorId}`);
  }
  async getExcelHistory(userId, calculatorId) {
    return await $axios.get(`user/${userId}/result/${calculatorId}/excel`);
  }
}

export default new HistoryService();
