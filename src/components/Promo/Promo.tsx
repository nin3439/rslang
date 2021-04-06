import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player/lazy';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { ChangeModalAuth } from '../../redux/actions/controllerActions';

const ChiefBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeadBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: url('https://images.unsplash.com/photo-1531685250784-7569952593d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80');
  background-size: cover;
  height: 100vh;
  background-position: center center;
`;

const LeftHeadBlock = styled.div`
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

const RightHeadBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderBlockTop = styled.div`
  font-size: 2.8rem;
`;

const HeaderBlockMiddle = styled.div`
  font-size: 2.4rem;
  padding-top: 20px;
`;

const HeaderBlockBottom = styled.div`
  font-size: 2.2rem;
`;

const HeadImage = styled.img`
  margin-top: 25px;
  width: 25vw;
  border: solid 8px #f3727b;
`;

const MiddleBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: #f3727b;
  padding-top: 25px;
  padding-bottom: 25px;
`;

const MiddleHeader = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  align-self: center;
  padding-top: 20px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  transform: rotate(1deg);
`;

const BottomBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 25px;
`;

const PlayerBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('https://images.unsplash.com/photo-1531685250784-7569952593d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80');
  background-size: cover;
  background-position: center center;
  padding-top: 25px;
  padding-bottom: 50px;
`;

const BottomLowerBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: bottom;
  background: url('https://images.unsplash.com/photo-1551098930-dbd128bd7489?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80');
  background-size: cover;
  height: 100vh;
  background-position: center center;
`;

const Promo: React.FC<any> = ({ changeModalAuth, isModalActive, isAuth }) => {
  return (
    <ChiefBlock>
      <HeadBlock>
        <LeftHeadBlock>
          <HeaderBlockTop>DREAMLANG</HeaderBlockTop>
          <HeaderBlockMiddle>это способ быстро</HeaderBlockMiddle>
          <HeaderBlockBottom>выучить английский язык</HeaderBlockBottom>
        </LeftHeadBlock>
        <RightHeadBlock>
          <HeadImage
            src="https://images.unsplash.com/photo-1487001175664-86de872e3cd6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=621&q=80"
            alt="dog"
          />
        </RightHeadBlock>
      </HeadBlock>
      <MiddleBlock>
        <Card style={{ maxWidth: '250px' }}>
          <CardActionArea>
            <img
              src="https://images.unsplash.com/photo-1574870111867-089730e5a72b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              title="Memorize"
              style={{ maxWidth: '250px' }}
              alt="Memorize"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Запоминай
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Для лучшего запонимания сложных слов отмечай их и повторяй
                отдельно
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card style={{ maxWidth: '250px' }}>
          <CardActionArea>
            <img
              src="https://images.unsplash.com/photo-1449027627419-e46b1154169d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=632&q=80"
              title="Library"
              style={{ maxWidth: '250px' }}
              alt="Library"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Изучай
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Библиотека из 4000 часто встречающихся слов. Изучай в своем
                темпе
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card style={{ maxWidth: '250px' }}>
          <CardActionArea>
            <img
              src="https://images.unsplash.com/photo-1549639457-2c41890d2db6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80"
              title="Game"
              style={{ maxWidth: '250px' }}
              alt="Game"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Играй
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Для лучшего запоминания играй и делись результатами с другими
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card style={{ maxWidth: '250px' }}>
          <CardActionArea>
            <img
              src="https://images.unsplash.com/photo-1609695001873-bf16717ba9db?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              title="Statistic"
              style={{ maxWidth: '250px' }}
              alt="Statistic"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Анализируй
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Подробная статистика твоих достижений, изученных слов и ошибок
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </MiddleBlock>
      <BottomBlock>
        <PlayerBlock>
          <MiddleHeader>Знакомство с приложением</MiddleHeader>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=Xs-HbHCcK58"
            controls={true}
            loop={true}
            width="70%"
            height="100vh"
            style={{ border: 'solid 16px #f3727b', transform: 'rotate(1deg)' }}
          />
        </PlayerBlock>
        <BottomLowerBlock>
          {isAuth ? null : (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => changeModalAuth()}
            >
              <div style={{ textAlign: 'center' }}>
                Присоединяйся <br /> к DREAMLANG
              </div>
            </Button>
          )}
        </BottomLowerBlock>
      </BottomBlock>
    </ChiefBlock>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isModalActive: state.controllers.isModalActive,
    isAuth: state.userReducer.isAuth,
  };
};
const mapStateToDispatch = (dispatch: any) => {
  return {
    changeModalAuth() {
      const action = ChangeModalAuth();
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(Promo);
