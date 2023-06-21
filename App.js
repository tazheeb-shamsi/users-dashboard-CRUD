import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './components/LoginScreen';
import UserListScreen from './components/UserListScreen';

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    UserList: UserListScreen,
  },
  {
    initialRouteName: 'Login',
  }
);

export default createAppContainer(AppNavigator);
