import RegisterService from "@/services/__form/auth/RegisterService";

export const useRegister = () => {
    const { mutate, isError, isSuccess, isIdle, data, error } = RegisterService.useSubmitFormMutation();

    const isLoading = !isIdle && !isError && !isSuccess;



    return {
        submitForm: mutate,
        isError,
        isSuccess,
        data,
        isLoading,
        error
    };
};
