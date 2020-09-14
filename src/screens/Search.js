import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import Icon from '../components/Icon';
import Feather from 'react-native-vector-icons/Feather';
import ScreenLayout from '../components/ScreenLayout';
import {fetchAllUsers} from '../firebase/auth';
import theme from '../config/theme';

const Search = () => {
  const [searchText, setSearchText] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await fetchAllUsers();
      const fetchedUsersDocs = fetchedUsers.docs;
      const fetchedUsersData = fetchedUsers.docs.map((doc) => doc._data);
      setUsers(fetchedUsersData);
    };
    fetchUsers();
  }, []);

  const handleChange = (text) => {
    setSearchText(text);
    const filteredUsers = users.filter((user) => user.username.includes(text));
    setFilteredUsers(filteredUsers);
  };

  // When a user enters a character in search input
  // query user with name or username that contains the entered character
  // and display returned users

  return (
    <ScreenLayout>
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
      <View>
        {filteredUsers.map(({photoUrl, username, fullName}) => (
          <View key={username} style={styles.userContainer}>
            <View style={styles.profilePhotoContainer}>
              <Image source={{uri: photoUrl}} style={styles.profilePhoto} />
            </View>
            <View style={styles.userNames}>
              <Text style={styles.usernameText}>{username}</Text>
              <Text style={styles.fullNameText}>{fullName}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScreenLayout>
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
    marginBottom: 70,
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    alignSelf: 'center',
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
    borderColor: theme.colors.danger,
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
