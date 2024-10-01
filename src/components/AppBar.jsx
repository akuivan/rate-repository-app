import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from './theme';
import AppBarTab from './AppBarTap';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundAppBar,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab label="Repositories" />
    </View>
  );
};

export default AppBar;
