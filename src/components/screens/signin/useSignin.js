import { useMutation } from "react-query";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import AuthService from "../../../services/auth.service";

export const useSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const { isAuth, setIsAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  const { mutate, isLoading } = useMutation(
    ["auth"],
    ({ login, password }) => AuthService.login(login, password),
    {
      onSuccess: () => {
        setIsAuth(true);
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
