import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {validateValues} from "@/validation/validateForm";
import * as Yup from "yup";
import {LabeledInputChangeHandler} from "@/app/shared/ui/InputWithLabel";

export interface UseFormProps<T extends Record<string, any>> {
    initialValues: T;
    validationSchema: Yup.ObjectSchema<{ [p: string]: any }>;
    onSubmit: (formData: T) => any;
}

export default function <T extends Record<string, any>>({initialValues, validationSchema, onSubmit}: UseFormProps<T>) {
    const [formData, setFormData] = useState(initialValues);
    const initialErrors = (Object.keys(initialValues) as (keyof typeof initialValues)[])
        .reduce((acc, currValue) => {acc[currValue] = ''; return acc;}, {} as Record<keyof T, string>);

    const [formErrors, setFormErrors] = useState(initialErrors);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const handleFormInputChange: LabeledInputChangeHandler = ({name , value}) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isFormValid) return;

        await onSubmit(formData);
    };

    useEffect(() => {
        validateValues(validationSchema, formData).then(({ isValid, errors }) => {
            setIsFormValid(isValid);
            setFormErrors(errors);
        })
    }, [formData, validationSchema]);

    return {
        formData,
        formErrors,
        isFormValid,
        handleFormInputChange,
        handleSubmit
    };
}
