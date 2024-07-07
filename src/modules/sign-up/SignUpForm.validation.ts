import { last } from "lodash";
import { object, string, number, date, ref } from "yup";

export const signUpSchema = object({
  email: string().required().email(),
  password: string().required(),
  confirmPassword: string()
    .nullable()
    .required()
    .oneOf([ref("password")], "Confirm Passwords must match with password"),
  phone: string().nullable().required(),
  firstName: string().nullable().required(),
  lastName: string().nullable().required(),
  gender: string().nullable().required(),
});
