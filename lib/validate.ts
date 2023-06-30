import { LoginForm, RegisterForm } from "@/types/index.types"

export function loginValidate(valuse: LoginForm) {
  const errors = {} as LoginForm
  if (!valuse.email) {
    errors.email = 'Email is required'
  }
  if (!valuse.password) {
    errors.password = 'Password is required'
  }
  return errors
}

export function registerValidate(valuse: RegisterForm) {
  const errors = {} as RegisterForm
  if (!valuse.username) {
    errors.username = 'Username is required'
  }
  if (!valuse.email) {
    errors.email = 'Email is required'
  }
  if (!valuse.password) {
    errors.password = 'Password is required'
  }
  if (!valuse.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required'
  }
  if (valuse.password !== valuse.confirmPassword) {
    errors.confirmPassword = 'Password and Confirm Password must be the same'
  }
  return errors
}
