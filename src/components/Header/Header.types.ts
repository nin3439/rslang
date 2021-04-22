import { ConnectedProps } from 'react-redux';

import { HeaderContainer } from './Header.container';

export interface HeaderProps extends ConnectedProps<typeof HeaderContainer> {
  showNight: boolean;
  updateMode: (showNight: boolean) => void;
}
