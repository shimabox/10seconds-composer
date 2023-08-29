import React from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import validationSchema from './validationSchema';
import { FormValues } from '../types';
import { MaxComposerNameLength } from '../constants/constraints';

const FormStyle = styled.form`
  padding: 0 .5rem;
`;

const InputWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`;

const InputStyle = styled.input`
  width: 60%;
  &::placeholder {
    font-size: 8px;
  }
`;

const CounterStyle = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 8px;
  span {
    padding-right: 2px;
  }
`;

const IsOverLengthStyle = styled.span`
  color: red;
`;

const ErrorMessageWrapper = styled.div`
  font-size: small;
  color: red;
  margin-top: 4px;
`;

const ButtonWrapper = styled.div`
  margin-top: 4px;
`;

const Form: React.FC = () => {
  const initialValues: FormValues = {
    name: 'ショパン'
  };
  const getInputLengthStyle = (inputLength: number) => {
    return inputLength > MaxComposerNameLength
            ? <IsOverLengthStyle>{inputLength}</IsOverLengthStyle>
            : <span>{inputLength}</span>;
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues, actions) => {
      try {
        console.log(values);
      } catch (error) {
        console.error(error);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
      <FormStyle
        onSubmit={formik.handleSubmit}
      >
        <InputWrapper>
          <InputStyle
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='ex) バッハ, 奥田民生'
          />
          <CounterStyle>
            {getInputLengthStyle(formik.values.name.length)}
            <span>/</span>
            <span>{ MaxComposerNameLength }</span>
          </CounterStyle>
        </InputWrapper>
        {formik.touched.name && formik.errors.name ?
          <ErrorMessageWrapper>{formik.errors.name}</ErrorMessageWrapper> : null
        }
        <ButtonWrapper>
          <button type='submit' disabled={formik.isSubmitting}>Submit</button>
        </ButtonWrapper>
      </FormStyle>
  );
};

export default Form;
