import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from './theme';
import routes from './routes';
import AppBarTab from './AppBarTap';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundAppBar,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab label="Repositories" to={routes.home} />
      <AppBarTab label="Sign In" to={routes.signIn} />
    </View>
  );
};

export default AppBar;
