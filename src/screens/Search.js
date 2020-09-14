import React, {useState} from 'react';
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
const Search = () => {
  const [searchText, setSearchText] = useState(null);

  const handleChange = (text) => {
    setSearchText(text);
  };

  const stories = [
    {
      image:
        'https://instagram.fktm8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/53613934_278745363050360_1949360354278506496_n.jpg?_nc_ht=instagram.fktm8-1.fna.fbcdn.net&_nc_ohc=w1Bi5HcR0lQAX_Xp5UF&oh=0f1e91f68a22438d0e33d0244bb5cbb2&oe=5F835D91',
      username: 'rameshsyn',
    },
    {
      image:
        'https://instagram.fktm8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/104178885_549712812376841_4953640171997264339_n.jpg?_nc_ht=instagram.fktm8-1.fna.fbcdn.net&_nc_ohc=YQtDrY325UEAX_QGjYx&oh=72f9fd7b82de9f48ea265f37da065b4d&oe=5F831344',
      username: 'baladnes',
    },
    {
      image:
        'https://images.unsplash.com/photo-1599577180570-74005925b055?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80',
      username: 'raitingtong',
    },
    {
      image:
        'https://images.unsplash.com/photo-1599526449314-12d6ca2dde92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      username: 'david',
    },
    {
      image:
        'https://images.unsplash.com/photo-1599651533235-49858dacc602?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80',
      username: 'janedoejanedoe',
    },
    {
      image:
        'https://images.unsplash.com/photo-1599651533235-49858dacc602?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80',
      username: 'janedoejanedoe',
    },
    {
      image:
        'https://images.unsplash.com/photo-1599651533235-49858dacc602?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80',
      username: 'janedoejanedoe',
    },
    {
      image:
        'https://images.unsplash.com/photo-1599651533235-49858dacc602?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80',
      username: 'janedoejanedoe',
    },
    {
      image:
        'https://images.unsplash.com/photo-1599651533235-49858dacc602?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80',
      username: 'janedoejanedoe',
    },
  ];

  const filter = (items, text) => {
    return items.filter((x) => x.username.includes(text));
  };

  const filteredStories = filter(stories, searchText);

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
      <ScrollView>
        {filteredStories.map((item, i) => (
          <View key={i} style={styles.items}>
            <Image source={{uri: item.image}} style={styles.image} />
            <Text style={styles.text}>{item.username}</Text>
          </View>
        ))}
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
  image: {
    width: 80,
    height: 80,
    marginBottom: 30,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: 'orange',
  },
  text: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 20,
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
  },
});
export default Search;
