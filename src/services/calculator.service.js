import { $axios } from "../api";

class CalculatorService {
  async writeCalculationResult(
    userId,
    calculatorId,
    resultValue,
    value3,
    value2,
    value1,
    uncertaintyBType,
    uncertaintyTotal,
    uncertaintyExpanded
  ) {
    const { data } = await $axios.post(`user/${userId}/result/`, {
      calculatorId,
      resultValue,
      value3,
      value2,
      value1,
      uncertaintyBType,
      uncertaintyTotal,
      uncertaintyExpanded,
    });
    return data;
  }
}

export default new CalculatorService();
