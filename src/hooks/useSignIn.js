import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE_USER } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(AUTHENTICATE_USER);
  
    const signIn = async ({ username, password }) => {
        try {
            const { data } = await mutate({
                variables: {
                    credentials: {
                        username,
                        password,
                    },
                },
            });
            
            const accessToken = data.authenticate.accessToken;
            
            await authStorage.setAccessToken(accessToken);
            await apolloClient.resetStore();
            
            return { data }; // Return data on successful sign-in
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };
    return [signIn, result];
};

export default useSignIn;
