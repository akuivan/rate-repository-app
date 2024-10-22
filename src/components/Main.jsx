import { Route, Routes, Navigate } from 'react-router-native';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import CreateReviewForm from './CreateReviewForm';
import SignIn from './SignIn';
import SignUp from './SignUpForm';
import AppBar from './AppBar';
import theme from '../theme';
import routes from '../utils/routes';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.backgroundMain
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path={routes.home} element={<RepositoryList/>}/>
        <Route path={routes.signIn} element={<SignIn/>}/>
        <Route path={routes.singleRepository} element={<SingleRepository/>} />
        <Route path={routes.createReview} element={<CreateReviewForm />} />
        <Route path={routes.signUp} element={<SignUp />} />
        <Route path='*' element={<Navigate to={routes.home} replace />} />
      </Routes>
    </View>
  );
};

export default Main;