import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, ScrollView} from 'react-native';
import Icon from '../components/Icon';
import Feather from 'react-native-vector-icons/Feather';
import ScreenLayout from '../components/ScreenLayout';
import theme from '../config/theme';
import UserList from '../components/User';
import {searchAlgolia} from '../firebase/algolia';

const Search = () => {
  const [searchText, setSearchText] = useState(null);
  const [users, setUsers] = useState([]);

  const handleChange = (text) => {
    setSearchText(text);
  };

  const search = async (text) => {
    const _text = (text || '').trim();
    if (!_text) {
      setUsers([]);
      return;
    }
    try {
      const res = await searchAlgolia(_text);
      setUsers(res.hits);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    search(searchText);
  }, [searchText]);

  return (
    <ScreenLayout>
      <View style={styles.searchBar}>
        <Icon name="search" style={styles.icon} component={Feather} size={25} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleChange}
        />
        {/* <Icon name="qr-scan" style={styles.icon} /> */}
      </View>
      <ScrollView>
        <UserList users={users} />
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 45,
    fontSize: 17,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 70,
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  profilePhoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  profilePhotoContainer: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'tomato',
  },
  usernameText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  fullNameText: {
    color: theme.colors.grey,
    fontSize: 16,
  },
  userNames: {
    marginLeft: 15,
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Search;
