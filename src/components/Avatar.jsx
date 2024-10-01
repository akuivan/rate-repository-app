import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
});

const Avatar = ({ uri }) => {
  return <Image source={{ uri }} style={styles.avatar} />;
};

export default Avatar;
