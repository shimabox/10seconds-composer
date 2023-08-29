import React from 'react';
import styled from 'styled-components';
import { MaxSoundTimeInSeconds } from '../constants/constraints';

const HeaderStyle = styled.header`
  color: gray;
  font-weight: bold;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0.5rem 0;
  font-size: medium;
  text-align: center;
`;

const Header: React.FC = () => {
  return (
    <>
      <HeaderStyle>
        <Title>{MaxSoundTimeInSeconds}seconds Composer.</Title>
      </HeaderStyle>
    </>
  );
}

export default Header;
