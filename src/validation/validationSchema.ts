import * as yup from 'yup';

export const userSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  skills: yup.array().of(yup.string().required('Skill is required')),
});
