import { $axios } from "../api";

class CalculatorService {
  async writeCalculationResult(userId, calculatorId, resultValue) {
    const { data } = await $axios.post(`user/${userId}/result/`, {
      calculatorId,
      resultValue,
    });
    return data;
  }
}

export default new CalculatorService();
