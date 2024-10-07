import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from './theme';
import routes from './routes';
import AppBarTab from './AppBarTap';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundAppBar,   
    padding: 10,
  },
  tabContainer: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.tabContainer}>
          <AppBarTab label="Repositories" to={routes.home} />
          <AppBarTab label="Sign In" to={routes.signIn} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
