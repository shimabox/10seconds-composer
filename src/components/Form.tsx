import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import styled from 'styled-components';
import validationSchema from './validationSchema';
import Player from './Player';
import GeneratedResult from './GeneratedResult';
import { FormValues } from '../types';
import { MaxComposerNameLength } from '../constants/constraints';
import { AppDispatch, RootState } from '../store';
import { fetchData } from '../modules/dataReducer';
import { ApiResponseStatus } from '../enums';

const FormStyle = styled.form`
  padding: 0 .5rem;
`;

const InputWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`;

const InputStyle = styled.input`
  width: 100%;
  height: 2rem;
  font-size: 1rem;
  &::placeholder {
    font-size: 1rem;
  }
`;

const CounterStyle = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 1rem;
  margin-left: .5rem;
  span {
    margin-right: 4px;
  }
  span:last-child {
    margin-right: 0;
  }
`;

const IsOverLengthStyle = styled.span`
  color: red;
`;

const ErrorMessageWrapper = styled.div`
  font-size: 1rem;
  color: red;
  margin-top: .5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
  margin-top: .5rem;
  button {
    width: 50%;
    height: 2rem;
    font-size: 1rem;
  }
`;

// @see https://www.webcreatorbox.com/inspiration/marquee-text
const GeneratingMessageWrapper = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  font-size: 1.2rem;
  margin: .5rem 0;
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
  const dispatch = useDispatch<AppDispatch>();
  const codeStructure = useSelector((state: RootState) => state.data.codeStructure);
  const thoughtsWhenComposing = useSelector((state: RootState) => state.data.thoughtsWhenComposing);
  const status = useSelector((state: RootState) => state.data.status);
  const initialValues: FormValues = {
    name: 'ショパン'
  };

  const isSucceeded = (status: ApiResponseStatus) => {
    return status === ApiResponseStatus.Succeeded;
  }
  const isLoading = (status: ApiResponseStatus) => {
    return status === ApiResponseStatus.Loading;
  }
  const isFailed = (status: ApiResponseStatus) => {
    return status === ApiResponseStatus.Failed;
  }
  const getInputLengthStyle = (inputLength: number) => {
    return inputLength > MaxComposerNameLength
            ? <IsOverLengthStyle>{inputLength}</IsOverLengthStyle>
            : <span>{inputLength}</span>;
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      dispatch(fetchData(values));
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
          <button type='submit' disabled={isLoading(status)}>Generate</button>
          <Player />
        </ButtonWrapper>
        {isSucceeded(status)
          ? <GeneratedResult
              codeStructure={codeStructure}
              thoughtsWhenComposing={thoughtsWhenComposing}
            />
          : null
        }
        {isLoading(status)
          ? <GeneratingMessageWrapper><div>Generating...</div></GeneratingMessageWrapper>
          : null
        }
        {isFailed(status)
          ? <ErrorMessageWrapper>Failed to generate code.<br/>Please try again.</ErrorMessageWrapper>
          : null
        }
      </FormStyle>
  );
};

export default Form;
