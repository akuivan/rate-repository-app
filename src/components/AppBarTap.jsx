import { Link } from 'react-router-native';
import { Text, StyleSheet, Pressable } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.whiteText,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  tab: {
    padding: 10,
  },
});

const AppBarTab = ({ label, to, onPress }) => {
  // If `onPress` is provided, render a Pressable, otherwise use Link
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.tab}>
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    );
  } else {
    return (
      <Link to={to} style={styles.tab}>
        <Text style={styles.text}>{label}</Text>
      </Link>
    );
  }
};

export default AppBarTab;
