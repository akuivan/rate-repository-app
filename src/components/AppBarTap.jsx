import { Pressable, Text, StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textColorAppBar,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  tab: {
    padding: 10,
  },
});

const AppBarTab = ({ label }) => {
  return (
    <Pressable onPress={() => {}} style={styles.tab}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

export default AppBarTab;
