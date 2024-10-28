import React, { Component } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../theme';
import RepositoryList from './RepositoryList';

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
    searchInput: {
      margin: 10,
      padding: 10,
      borderColor: theme.colors.textSecondary,
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: 'white',
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

class RepositoryListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC',
      modalVisible: false,
      searchKeyword: '',
    };
  }

  // Handles opening/closing the filter modal
  toggleModal = () => {
    this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));
  };

  // Sets the order state and updates direction based on selected order
  setOrder = (orderBy) => {
    let orderDirection = 'DESC';
    if (orderBy === 'RATING_AVERAGE_ASC') {
      orderDirection = 'ASC';
    }
    this.setState({ orderBy, orderDirection });
  };

  renderHeader = () => (
    <>
    <TextInput
      style={styles.searchInput}
      placeholder='Search by repository name or owner'
      value={this.state.searchKeyword}
      onChangeText={(text) => this.setState({ searchKeyword: text })}
    />
    <TouchableOpacity onPress={this.toggleModal} style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter: {getFilterTitle(this.state.orderBy)}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.toggleModal}
        >
          <View style={styles.modal}>
            <View style={styles.buttonContainer}>
              <Text>Select an item...</Text>
              <Picker
                selectedValue={this.state.orderBy}
                style={styles.picker}
                onValueChange={(itemValue) => this.setOrder(itemValue)}
              >
                <Picker.Item label='Latest Repositories' value='CREATED_AT' />
                <Picker.Item label='Highest Rated Repositories' value='RATING_AVERAGE' />
                <Picker.Item label='Lowest Rated Repositories' value='RATING_AVERAGE_ASC' />
              </Picker>
              <TouchableOpacity onPress={this.toggleModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        </>
  );

  render() {
    return (
      <View>
        <RepositoryList
          orderBy={this.state.orderBy}
          orderDirection={this.state.orderDirection}
          searchKeyword={this.state.searchKeyword}
          renderHeader={this.renderHeader}
        />
      </View>
    );
  }
}

export default RepositoryListContainer;
