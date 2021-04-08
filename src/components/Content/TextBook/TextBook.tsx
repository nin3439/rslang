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

export const TextBook = () => {
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
      <StyledAppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Электронный учебник" component={Link} to="/textbook" />
          <Tab label="Словарь" component={Link} to={`${path}/dictionary`} />
          <SettingsBlock>
            <FormControl component="fieldset">
              <FormGroup row={true}>
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
              </FormGroup>
            </FormControl>
          </SettingsBlock>
        </Tabs>
      </StyledAppBar>

      <SwitchRouter>
        <Route path={`${path}/dictionary`}>
          <Dictionary />
        </Route>
        <Route path={`${path}/group/:groupNumber/page/:pageNumber`}>
          <Pages />
        </Route>
        <Route exact path="/textbook">
          <Groups />
        </Route>
      </SwitchRouter>
    </div>
  );
};
