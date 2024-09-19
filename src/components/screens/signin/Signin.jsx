import { useState } from "react";
import Field from "../../ui/Fields/Field.jsx";
import LoaderOverlay from "../../ui/LoaderOverlay";
import ErrorMessage from "../../ui/Notification/ErrorMessage.jsx";
import { useSignIn } from "./useSignin.js";
import { Link } from "react-router-dom";

const SignIn = () => {
  const { errors, handleSubmit, isLoading, onSubmit, register, authError } =
    useSignIn(); // Получаем authError

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center py-12 px-4 bg-gray-100 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Logo"
          className="mx-auto w-14 h-14 object-cover rounded-full mb-4"
          src="/images/logo.png"
        />
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Войти в аккаунт
        </h2>

        <div className="bg-white shadow-lg rounded-lg p-8">
          {isLoading && <LoaderOverlay />}
          <ErrorMessage message={authError} />
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Логин
              </label>
              <Field
                error={errors?.login?.message}
                name="login"
                register={register}
                options={{ required: "Это поле обязательно" }}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Пароль
              </label>
              <Field
                error={errors?.password?.message}
                name="password"
                register={register}
                options={{ required: "Это поле обязательно" }}
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-50"
              />
            </div>

            <div>
              <button className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-full bg-sky-500 text-white hover:bg-sky-600">
                Войти
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="mt-4 flex justify-center gap-2 text-sm text-gray-500">
                <div>У вас нет аккаунта?</div>
                <Link
                  to="/register"
                  className="font-medium text-gray-500 hover:text-gray-600 cursor-pointer underline"
                >
                  Зарегистрируйтесь
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
