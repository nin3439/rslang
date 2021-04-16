import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

export const ChiefBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const HeadBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: ${({ theme }) => theme.backgroundImage};
  background-size: cover;
  height: 70vh;
  background-position: center center;
`;

export const LeftHeadBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  transform: rotate(-3deg);
  padding-top: 20px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.00938em;
`;

export const RightHeadBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderBlockTop = styled.div`
  font-size: 2.8rem;
`;

export const HeaderBlockMiddle = styled.div`
  font-size: 2.4rem;
  padding-top: 20px;
`;

export const HeaderBlockBottom = styled.div`
  font-size: 2.2rem;
`;

export const HeadImage = styled.img`
  margin-top: 25px;
  width: 35vw;
  border: ${({ theme }) => theme.borderImage};
`;

export const MiddleBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: ${({ theme }) => theme.middleBlock};
  padding-top: 25px;
  padding-bottom: 25px;
`;

export const LittleBlock = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backgroundImage};
  height: 10vh;
  background-size: cover;
  background-position: center center;
`;

export const MiddleHeader = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  align-self: center;
  padding-top: 20px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.00938em;
`;

export const BottomBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const PlayerBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.backgroundImage};
  background-size: cover;
  background-position: center center;
  padding-top: 25px;
  padding-bottom: 50px;
`;

export const BottomLowerBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: bottom;
  background: url('https://images.unsplash.com/photo-1551098930-dbd128bd7489?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80');
  background-size: cover;
  height: 70vh;
  background-position: center center;
`;

export const StyledCard = styled(Card)`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.card};
  max-width: 250px;
`;

export const ButtonInscription = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
`;

export const StyledReactPlayer = styled.div`
  border: ${({ theme }) => theme.borderVideo};
  transform: rotate(1deg);
  width: 70%;
  height: 80vh;
`;

export const TeamBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  background: ${({ theme }) => theme.middleBlock};
`;

export const LeftTeamBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CenterTeamBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const RightTeamBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const TeamCard = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.card};
  margin: 7vh 5vw;
  height: 50vh;
  width: 20vw;
`;

export const TeamCardActionArea = styled(CardActionArea)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
