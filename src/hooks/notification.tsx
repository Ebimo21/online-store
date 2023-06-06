import { useState } from "react";

export default function useNotification (){
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    return {
        error,
        setError,
        errorMessage,
        setErrorMessage,
        success,
        setSuccess,
        successMessage,
        setSuccessMessage
    }
}