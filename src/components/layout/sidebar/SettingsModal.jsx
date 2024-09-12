import React, { useState } from "react";
import { useForm } from "react-hook-form"; // Импортируйте useForm, если вы его используете
import Button from "../../ui/button/Button";
import Field from "../../ui/Fields/Field.jsx";
import Modal from "./Modals.jsx";

const SettingsModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2
              className="
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
                dark:text-gray-200
              "
            >
              Личный кабинет
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Тут вы можете изменить информацию.
            </p>

            <div className="mt-10 flex flex-col gap-y-8">
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ФИО
                  </label>
                  <Field
                    error={errors?.fullName?.message}
                    name="fullName"
                    register={register}
                    options={{ required: "ФИО обязательное" }}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Field
                    error={errors?.email?.message}
                    name="email"
                    register={register}
                    options={{ required: "Email обязательный" }}
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
                    options={{ required: "Пароль обязательный" }}
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-50"
                  />
                </div>
              </>
            </div>
          </div>
        </div>

        <div
          className="
            mt-6 
            flex 
            items-center 
            justify-end 
            gap-x-6
          "
        >
          <Button disabled={isLoading} secondary onClick={onClose}>
            Отмена
          </Button>
          <Button disabled={isLoading} type="submit">
            Сохранить
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
