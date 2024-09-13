import { useMutation } from "react-query";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import calculatorService from "../../../services/calculator.service";

export const useCalculator = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const { user } = useAuth();

  const { mutate, isLoading } = useMutation(
    ["write"],
    ({ resultValue }) =>
      calculatorService.writeCalculationResult(user.decode.sub, 1, resultValue),
    {
      onSuccess: (data) => {
        reset();
      },
    }
  );

  const onSubmit = (data) => {
    mutate(data);
  };

  return useMemo(
    () => ({
      register,
      handleSubmit,
      errors,
      isLoading,
      onSubmit,
    }),
    [errors, isLoading]
  );
};
