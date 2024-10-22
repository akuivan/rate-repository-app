import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, Modal, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import routes from '../utils/routes';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  filterButton: {
    margin: 10,
  },
  filterButtonText: {
    justifyContent: 'center',
    color: 'black',
    fontSize: 16,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  picker: {
    width: 200,
    height: 150,
    backgroundColor: 'white',
    marginBottom: 10,
    color: theme.colors.textSecondary,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'grey',
  },
});

// Helper function to get the button title based on orderBy
const getFilterTitle = (orderBy) => {
  switch (orderBy) {
    case 'CREATED_AT':
      return 'Latest Repositories';
    case 'RATING_AVERAGE':
      return 'Highest Rated Repositories';
    default:
      return 'Lowest Rated Repositories';
  }
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT'); // Default to latest repositories
  const [orderDirection, setOrderDirection] = useState('DESC'); // Default to descending
  const [modalVisible, setModalVisible] = useState(false);
  
  const { repositories } = useRepositories(orderBy, orderDirection);
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handlePress = (id) => {
    navigate(routes.singleRepository.replace(':id', id));
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.filterButton}
      >
      <Text style={styles.filterButtonText}>Filter: {getFilterTitle(orderBy)}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <View style={styles.buttonContainer}>
            <Text>Select an item...</Text>
            <Picker
              selectedValue={orderBy}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setOrderBy(itemValue);
                let newOrderDirection;

                if (itemValue === 'RATING_AVERAGE') {
                  newOrderDirection = 'DESC'; // Highest rated repositories
                } else if (itemValue === 'CREATED_AT') {
                  newOrderDirection = 'DESC'; // Latest repositories
                } else if (itemValue === 'RATING_AVERAGE_ASC') {
                  newOrderDirection = 'ASC'; // Lowest rated repositories
                }
                setOrderDirection(newOrderDirection);
              }}
            >           
              <Picker.Item label='Latest Repositories' value='CREATED_AT' />
              <Picker.Item label='Highest Rated Repositories' value='RATING_AVERAGE' />
              <Picker.Item label='Lowest Rated Repositories' value='RATING_AVERAGE_ASC' />
            </Picker>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item.id)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default RepositoryList;
