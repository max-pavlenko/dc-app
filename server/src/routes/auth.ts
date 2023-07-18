import exp from "express";
import Joi from "joi";
import EJV from "express-joi-validation";
import authController from "../controllers/auth";

const router = exp.Router();

export const validator = EJV.createValidator({});
const loginSchema = Joi.object({
    password: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
})
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
})

router.post('/register', validator.body(registerSchema), authController.register)
router.post('/login', validator.body(loginSchema), authController.login)

export default router;
