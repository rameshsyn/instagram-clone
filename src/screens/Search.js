import React from 'react';
import { SearchBar} from 'react-native-elements';
import ScreenLayout from '../components/ScreenLayout'
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

const UserDetails=()=>{

  return(
    <TouchableWithoutFeedback >
      <View >
        <Image source={{
          uri:'https://instagram.fktm8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/53613934_278745363050360_1949360354278506496_n.jpg?_nc_ht=instagram.fktm8-1.fna.fbcdn.net&_nc_ohc=w1Bi5HcR0lQAX_Xp5UF&oh=0f1e91f68a22438d0e33d0244bb5cbb2&oe=5F835D91',
        }}
        style={styles.profile}
        />
        <Text>nabaraj</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
 class Search extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <ScreenLayout>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <UserDetails/>
      </ScreenLayout>
    );
  }
}
const styles=StyleSheet.create({
  profile:{
    height:80,
    width:80,
    borderRadius:30,
    borderWidth:2,
    borderColor:'orange',
    
  },
})

export default Search;