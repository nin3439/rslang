import Loader from 'react-loader-spinner';
import styled from 'styled-components';

const BigBlock = styled.div`
  z-index: 9000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const BigLoader = () => {
  return (
    <BigBlock>
      <Loader type="BallTriangle" color="#dc004e" height={150} width={150} />
    </BigBlock>
  );
};
