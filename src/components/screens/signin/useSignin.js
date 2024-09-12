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

  const { isAuth, setIsAuth, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
      window.location.reload();
    }
  }, [isAuth]);

  const { mutate, isLoading } = useMutation(
    ["auth"],
    ({ login, password }) => AuthService.login(login, password),
    {
      onSuccess: (data) => {
        console.log("use - ", data);
        setUser(true);
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
