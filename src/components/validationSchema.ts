import * as yup from 'yup';
import { MaxComposerNameLength } from '../constants/constraints';

const validationSchema = yup.object().shape({
  name: yup.string()
    .max(MaxComposerNameLength, `Name should not exceed ${MaxComposerNameLength} characters.`)
    .required('Name is required.'),
});

export default validationSchema;
