import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import Icon from '../components/Icon';
import Feather from 'react-native-vector-icons/Feather';
const Search = () => {
  const [searchText, setSearchText] = useState(null);

  const handleChange = (text) => {
    setSearchText(text);
  };

  return (
    <>
      <View style={styles.searchBar}>
        <Icon name="search" style={styles.icon} component={Feather} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleChange}
        />
        {/* <Icon name="qr-scan" style={styles.icon} /> */}
      </View>
      <Text>{searchText}</Text>
    </>
  );
};
const styles = StyleSheet.create({
  searchInput: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    alignItems: 'flex-end',
    padding: 8,
    fontSize: 18,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    alignSelf: 'center',
  },
});
export default Search;
