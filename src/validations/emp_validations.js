import { z } from "zod";

export const EmpFormValidations = z.object({
    area_id: z.string().min(1, {
        message: "Area is not Empty.",
    }),
    branch_id: z.string().min(1, {
        message: "Brand is not Empty.",
    }),
    employee_nm: z.string().min(1, {
        message: "Employee Name is not Empty.",
    }),
    email: z.string().email({
        message: "Email is invalid.",
    }),
    gender: z.string().min(1, {
        message: "Gender is not Empty.",
    }),
    salary: z.number().min(1, {
        message: "Salary is not Empty.",
    }),
    address: z.string().min(1, {
        message: "Address is not Empty.",
    }),
    phone: z.string().min(1, {
        message: "Phone is not Empty.",
    }),
    position: z.string().min(1, {
        message: "Position is not Empty.",
    }),
    birthday: z.date(),
    imgsrc: z.string().min(1, {
        message: "Image is not Empty.",
    }),
})