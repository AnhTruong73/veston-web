import { z } from "zod";

export const CustomerFormValidations = z.object({
    customer_nm: z.string().min(1, {
        message: "Customer Name is not Empty.",
    }),
    address: z.string().min(1, {
        message: "Address is not Empty.",
    }),
    phone: z.string().min(1, {
        message: "Phone is not Empty.",
    }),
    email: z.string().email(1, {
        message: "Email is invalid.",
    }),
    gender:z.string(),
    birthday: z.date(),
    flgTp: z.string(),
    cre_usr_id: z.string(),
    cre_dt: z.string(),
    upd_usr_id: z.string(),
    upd_dt: z.string(),
})
