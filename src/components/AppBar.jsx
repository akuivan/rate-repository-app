import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from './theme';
import routes from './routes';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
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
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data } = useQuery(GET_USER);

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    console.log('User signed out')
  };

  // Check if user is signed in
  const isSignedIn = data && data.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.tabContainer}>
          <AppBarTab label='Repositories' to={routes.home} />
          {isSignedIn ? (
            <AppBarTab label='Sign Out' onPress={handleSignOut} />
          ) : (
            <AppBarTab label='Sign In' to={routes.signIn} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
