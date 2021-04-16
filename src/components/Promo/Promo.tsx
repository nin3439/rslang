import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player/lazy';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { changeModalAuth } from 'redux/actions/controllerActions';
import { nina, anton, andrei } from 'assets/team';
import {
  ChiefBlock,
  HeadBlock,
  LeftHeadBlock,
  RightHeadBlock,
  HeaderBlockTop,
  HeaderBlockMiddle,
  HeaderBlockBottom,
  HeadImage,
  MiddleBlock,
  MiddleHeader,
  BottomBlock,
  PlayerBlock,
  BottomLowerBlock,
  StyledCard,
  ButtonInscription,
  StyledReactPlayer,
  TeamBlock,
  RightTeamBlock,
  TeamCard,
  TeamCardActionArea,
  LittleBlock,
  StyledImg,
  LeftTeamBlock,
  CenterTeamBlock,
  TeamImage,
  StyledCardActionArea,
} from './style';

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
            src="https://www.zastavki.com/pictures/640x480/2013Animals___Dogs_Dog_reading_a_book_042363_29.jpg"
            alt="dog"
          />
        </RightHeadBlock>
      </HeadBlock>
      <MiddleBlock>
        <StyledCard>
          <StyledCardActionArea>
            <StyledImg
              src="https://images.unsplash.com/photo-1574870111867-089730e5a72b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              title="Memorize"
              alt="Memorize"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Запоминай
              </Typography>
              <Typography variant="body2" color="inherit" component="p">
                Для лучшего запонимания сложных слов отмечай их и повторяй
                отдельно
              </Typography>
            </CardContent>
          </StyledCardActionArea>
        </StyledCard>
        <StyledCard>
          <StyledCardActionArea>
            <StyledImg
              src="https://images.unsplash.com/photo-1449027627419-e46b1154169d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=632&q=80"
              title="Library"
              alt="Library"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Изучай
              </Typography>
              <Typography variant="body2" color="inherit" component="p">
                Библиотека из 4000 часто встречающихся слов. Изучай в своем
                темпе
              </Typography>
            </CardContent>
          </StyledCardActionArea>
        </StyledCard>
        <StyledCard>
          <StyledCardActionArea>
            <StyledImg
              src="https://images.unsplash.com/photo-1549639457-2c41890d2db6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80"
              title="Game"
              alt="Game"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Играй
              </Typography>
              <Typography variant="body2" color="inherit" component="p">
                Для лучшего запоминания играй и делись результатами с другими
              </Typography>
            </CardContent>
          </StyledCardActionArea>
        </StyledCard>
        <StyledCard>
          <StyledCardActionArea>
            <StyledImg
              src="https://images.unsplash.com/photo-1609695001873-bf16717ba9db?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              title="Statistic"
              alt="Statistic"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Анализируй
              </Typography>
              <Typography variant="body2" color="inherit" component="p">
                Подробная статистика твоих достижений, изученных слов и ошибок
              </Typography>
            </CardContent>
          </StyledCardActionArea>
        </StyledCard>
      </MiddleBlock>
      <BottomBlock>
        <PlayerBlock>
          <MiddleHeader>Знакомство с приложением</MiddleHeader>
          <StyledReactPlayer>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=e_lUniqWAeI"
              controls={true}
              loop={true}
              width="100%"
              height="80vh"
            />
          </StyledReactPlayer>
        </PlayerBlock>
        <TeamBlock>
          <LeftTeamBlock>
            <TeamImage
              src="https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
              title="Statistic"
              style={{ maxWidth: '250px' }}
              alt="Team"
            />
          </LeftTeamBlock>
          <CenterTeamBlock>
            <MiddleHeader>Знакомство</MiddleHeader>
            <MiddleHeader>с нашей командой</MiddleHeader>
            <MiddleHeader>DreamTeam</MiddleHeader>
          </CenterTeamBlock>
          <RightTeamBlock>
            <a
              href="https://www.linkedin.com/in/nina-viter-8b4459202/"
              style={{ textDecoration: 'none' }}
            >
              <TeamCard>
                <TeamCardActionArea>
                  <img
                    src={nina}
                    title="Nina"
                    style={{ maxWidth: '120px' }}
                    alt="Nina"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      Nina
                    </Typography>
                    <Typography variant="body2" color="inherit" component="p">
                      <strong>Team Lead, разработчик</strong>
                    </Typography>
                    <Typography variant="body2" color="inherit" component="p">
                      Игры 'Спринт', 'Аудиовызов', 'SpeakIt', 'Саванна'
                    </Typography>
                  </CardContent>
                </TeamCardActionArea>
              </TeamCard>
            </a>
            <a
              href="https://www.linkedin.com/in/anton-lappo-5a9ba4197/"
              style={{ textDecoration: 'none' }}
            >
              <TeamCard>
                <TeamCardActionArea>
                  <img
                    src={anton}
                    title="Anton"
                    style={{ maxWidth: '120px' }}
                    alt="Anton"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      Anton
                    </Typography>
                    <Typography variant="body2" color="inherit" component="p">
                      <strong>Full stack developer</strong>
                    </Typography>
                    <Typography variant="body2" color="inherit" component="p">
                      Электронный учебник, словарь, карточка слова
                    </Typography>
                  </CardContent>
                </TeamCardActionArea>
              </TeamCard>
            </a>
            <a
              href="https://www.linkedin.com/in/andrei-roh-85086b204/"
              style={{ textDecoration: 'none' }}
            >
              <TeamCard>
                <TeamCardActionArea>
                  <img
                    src={andrei}
                    title="Andrei"
                    style={{ maxWidth: '120px' }}
                    alt="Andrei"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      Andrei
                    </Typography>
                    <Typography variant="body2" color="inherit" component="p">
                      <strong>Frontend developer</strong>
                    </Typography>
                    <Typography variant="body2" color="inherit" component="p">
                      Авторизация, Главная страница, игра 'Саванна'
                    </Typography>
                  </CardContent>
                </TeamCardActionArea>
              </TeamCard>
            </a>
          </RightTeamBlock>
        </TeamBlock>
        <LittleBlock />
        <BottomLowerBlock>
          {isAuth ? null : (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => changeModalAuth()}
            >
              <ButtonInscription>
                Присоединяйся <br /> к DREAMLANG
              </ButtonInscription>
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
      const action = changeModalAuth();
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(Promo);
