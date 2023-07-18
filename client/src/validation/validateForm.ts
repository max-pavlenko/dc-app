import * as Yup from 'yup';
import {ValidationError} from 'yup';

export async function validateValues<T extends Record<string, any>>(schema: Yup.ObjectSchema<{ [p: string]: any }>, values: T) {
    const errors = {} as { [K in keyof T]: string };
    await validateSchema({schema, values, errorCallback: (innerErrors) => {
            innerErrors?.forEach((e) => { //@ts-ignore
                errors[e.path!] = e.message;
            });
            console.log('innerErrors',innerErrors);
        }
    })

    return {errors, isValid: Object.entries(errors).length === 0};
}


async function validateSchema<T extends Record<string, any>>({schema, values, errorCallback}: {
    schema: Yup.ObjectSchema<any>,
    values: T,
    errorCallback: (errors: ValidationError[]) => void
}) {
    try {
        const validatedData = await schema.validate(values, {
            abortEarly: false,
        });
        console.log('validateSchema', schema, values)
        console.log('validatedData', validatedData);
    } catch (error: unknown) {
        const err = error as ValidationError;
        errorCallback(err.inner);
    }
}
