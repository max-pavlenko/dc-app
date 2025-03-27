import exp from 'express';
import Joi from 'joi';
import EJV from 'express-joi-validation';
import authController from '../controllers/auth';

const router = exp.Router();

export const validator = EJV.createValidator({});
const loginSchema = Joi.object({
   password: Joi.string().min(3).max(20).required(),
   email: Joi.string().email().required(),
});
const registerSchema = Joi.object({
   username: Joi.string().min(3).max(20).required(),
   password: Joi.string().min(3).max(20).required(),
   email: Joi.string().email().required(),
});
const forgotPasswordSchema = Joi.object({
   email: Joi.string().email().required(),
});
const resetPasswordSchema = Joi.object({
   token: Joi.string().required(),
   password: Joi.string().min(6).required(),
});
const verifyTokenSchema = Joi.object({
   token: Joi.string().required(),
});

router.post('/register', validator.body(registerSchema), authController.register);
router.post('/login', validator.body(loginSchema), authController.login);
router.get('/current-user', authController.currentUser);

router.post("/forgot-password", validator.body(forgotPasswordSchema), authController.forgotPassword)
router.post("/reset-password", validator.body(resetPasswordSchema), authController.resetPassword)
router.post("/verify-reset-token", validator.body(verifyTokenSchema), authController.verifyResetToken)

router.post('/google', authController.authWithGoogle);

export default router;
