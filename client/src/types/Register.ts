import {LoginFormValues} from "@/types/Login";

export interface RegisterFormValues extends LoginFormValues {
    username: string,
}
