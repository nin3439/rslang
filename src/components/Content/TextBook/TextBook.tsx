import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Route, Switch as SwitchRouter, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Pages from 'components/Content/TextBook/pages/pages';
import { Dictionary } from 'components/Content/TextBook/dictionary/Dictionary';
import { Groups } from 'components/Content/TextBook/groups/groups';
import { IStatePage } from 'types';
import { connect } from 'react-redux';

const SettingsBlock = styled.div`
  display: flex;
  min-height: 48px;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const StyledAppBar = styled(AppBar)`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.body};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const StyledFormGroup = styled(FormGroup)`
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: 'inherit',
  },
  main: {
    marginTop: '20px',
  },
}));

const TextBook = ({ isAuth }: { isAuth: boolean }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { path } = useRouteMatch();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const [options, setOptions] = React.useState({
    translate: true,
    buttons: true,
  });

  const optionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <StyledAppBar position="relative" color="default">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Электронный учебник" component={Link} to="/textbook" />
          {isAuth && (
            <Tab label="Словарь" component={Link} to={`${path}/dictionary`} />
          )}
        </Tabs>
      </StyledAppBar>
      <SettingsBlock>
        <FormControl component="fieldset">
          <StyledFormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={options.translate}
                  onChange={optionsChange}
                  name="translate"
                />
              }
              label="Показывать перевод слов"
            />
            {isAuth && (
              <FormControlLabel
                control={
                  <Switch
                    checked={options.buttons}
                    onChange={optionsChange}
                    name="buttons"
                  />
                }
                label="Показывать кнопки словаря"
              />
            )}
          </StyledFormGroup>
        </FormControl>
      </SettingsBlock>
      <SwitchRouter>
        <Route exact path={`${path}/dictionary/:category`}>
          <Groups />
        </Route>
        <Route
          exact
          path={`${path}/dictionary/:category/group/:groupNumber/page/:pageNumber`}
        >
          <Pages options={options} />
        </Route>
        <Route exact path={`${path}/dictionary`}>
          <Dictionary />
        </Route>
        <Route path={`${path}/group/:groupNumber/page/:pageNumber`}>
          <Pages options={options} />
        </Route>
        <Route exact path="/textbook">
          <Groups />
        </Route>
      </SwitchRouter>
    </div>
  );
};
const mapStateToProps = (state: IStatePage) => {
  return {
    isAuth: state.userReducer.isAuth,
  };
};
export default connect(mapStateToProps)(TextBook);
