import React, { useState } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import validationSchema from './validationSchema';
import Player from './Player';
import { CodeStructureType, FormValues } from '../types';
import { MaxComposerNameLength } from '../constants/constraints';
import { setCodeStructureToStorage } from '../storage';
import caller from '../api/caller';

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
  display: flex;
  column-gap: 1rem;
  button {
    width: 50%;
  }
`;

// @see https://www.webcreatorbox.com/inspiration/marquee-text
const GeneratingMessageWrapper = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  font-size: small;
  div {
    width: 100%;
    animation: marquee 5s linear infinite;
  }
  @keyframes marquee {
    0%   { translate: calc(100%); }
    100% { translate: calc(-100%); }
  }
`;

const Form: React.FC = () => {
  const [isSuccessGen, setSuccessGen] = useState(true);

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
        const response: CodeStructureType = await caller(values);
        setCodeStructureToStorage(response);
        setSuccessGen(true);
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
          <button type='submit' disabled={formik.isSubmitting}>Generate</button>
          <Player />
        </ButtonWrapper>
        {!isSuccessGen
          ? <ErrorMessageWrapper>Failed to generate code.<br/>Please try again.</ErrorMessageWrapper>
          : null
        }
        {formik.isSubmitting
          ? <GeneratingMessageWrapper><div>Generating...</div></GeneratingMessageWrapper>
          : null
        }
      </FormStyle>
  );
};

export default Form;
