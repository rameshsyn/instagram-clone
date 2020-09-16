import React from 'react';
import {View, Text,StyleSheet,Image, Button,ScrollView} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import theme from '../config/theme';

const Following=()=>{
  return(
    <View style={styles.followingPost}>
      <View style={styles.followingEdit}>
        <Image source={{
          uri:'https://images.pexels.com/photos/5208025/pexels-photo-5208025.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        }} style={styles.userImage}/>
       <View>
        <Text style={styles.userName}>Nabaraj</Text>
       <Text style={styles.followingText}>following you.<Text style={{color:theme.colors.grey,}}>2d</Text></Text>
       </View>
      </View>
      <View style={styles.following}>
        <Button title='Following'  />
      </View>
    </View>
  );
}
const Suggestions=()=>{
  return(
    <View>
      <Text style={styles.suggestion}>Suggestions for you</Text>
      <View style={styles.suggestionPart}>
      <View style={styles.followingEdit}>
      <Image source={{
          uri:'https://images.pexels.com/photos/5208025/pexels-photo-5208025.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        }} style={styles.userImage}/>
        <View>
        <Text style={styles.userName}>@nabaraj</Text>
       <Text style={styles.followingText}>Nabaraj Rai</Text>
        <Text style={styles.follows}>follows you</Text>
        </View>
      </View>
      <View style={styles.following}>
        <Button title='Follow'/>
      </View>
    </View>
    <View style={styles.suggestionPart}>
      <View style={styles.followingEdit}>
      <Image source={{
          uri:'https://images.pexels.com/photos/5208025/pexels-photo-5208025.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        }} style={styles.userImage}/>
        <View>
        <Text style={styles.userName}>@nabaraj</Text>
       <Text style={styles.followingText}>Nabaraj Rai</Text>
        <Text style={styles.follows}>follows you</Text>
        </View>
      </View>
      <View style={styles.following}>
        <Button title='Follow'/>
      </View>
    </View>
    <View style={styles.suggestionPart}>
      <View style={styles.followingEdit}>
      <Image source={{
          uri:'https://images.pexels.com/photos/5208025/pexels-photo-5208025.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        }} style={styles.userImage}/>
        <View>
        <Text style={styles.userName}>@nabaraj</Text>
       <Text style={styles.followingText}>Nabaraj Rai</Text>
        <Text style={styles.follows}>follows you</Text>
        </View>
      </View>
      <View style={styles.following}>
        <Button title='Follow'/>
      </View>
    </View>
    <View style={styles.suggestionPart}>
      <View style={styles.followingEdit}>
      <Image source={{
          uri:'https://images.pexels.com/photos/5208025/pexels-photo-5208025.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        }} style={styles.userImage}/>
        <View>
        <Text style={styles.userName}>@nabaraj</Text>
       <Text style={styles.followingText}>Nabaraj Rai</Text>
        <Text style={styles.follows}>follows you</Text>
        </View>
      </View>
      <View style={styles.following}>
        <Button title='Follow'/>
      </View>
    </View>
    <View style={styles.suggestionPart}>
      <View style={styles.followingEdit}>
      <Image source={{
          uri:'https://images.pexels.com/photos/5208025/pexels-photo-5208025.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        }} style={styles.userImage}/>
        <View>
        <Text style={styles.userName}>@nabaraj</Text>
       <Text style={styles.followingText}>Nabaraj Rai</Text>
        <Text style={styles.follows}>follows you</Text>
        </View>
      </View>
      <View style={styles.following}>
        <Button title='Follow'/>
      </View>
    </View>
    <View style={styles.suggestionPart}>
      <View style={styles.followingEdit}>
      <Image source={{
          uri:'https://images.pexels.com/photos/5208025/pexels-photo-5208025.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        }} style={styles.userImage}/>
        <View>
        <Text style={styles.userName}>@nabaraj</Text>
       <Text style={styles.followingText}>Nabaraj Rai</Text>
        <Text style={styles.follows}>follows you</Text>
        </View>
      </View>
      <View style={styles.following}>
        <Button title='Follow'/>
      </View>
    </View>
    <View style={styles.suggestionPart}>
      <View style={styles.followingEdit}>
      <Image source={{
          uri:'https://images.pexels.com/photos/5208025/pexels-photo-5208025.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        }} style={styles.userImage}/>
        <View>
        <Text style={styles.userName}>@nabaraj</Text>
       <Text style={styles.followingText}>Nabaraj Rai</Text>
        <Text style={styles.follows}>follows you</Text>
        </View>
      </View>
      <View style={styles.following}>
        <Button title='Follow'/>
      </View>
    </View>
    <View style={styles.suggestionPart}>
      <View style={styles.followingEdit}>
      <Image source={{
          uri:'https://images.pexels.com/photos/5208025/pexels-photo-5208025.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        }} style={styles.userImage}/>
        <View>
        <Text style={styles.userName}>@nabaraj</Text>
       <Text style={styles.followingText}>Nabaraj Rai</Text>
        <Text style={styles.follows}>follows you</Text>
        </View>
      </View>
      <View style={styles.following}>
        <Button title='Follow'/>
      </View>
    </View>
    </View>
  );
}
const Notification = () => {
  return (
    <ScreenLayout>
      <View style={styles.notification}>
        <Text style={styles.notificationText} >Activity</Text>
      </View>
      <ScrollView>
      <Following/>
      <Suggestions/>
      </ScrollView>
    </ScreenLayout>
  );
};
const styles=StyleSheet.create({
  notification:{
    padding:16,
    borderBottomColor:theme.colors.grey,
    borderWidth:2,
    marginBottom:7,      
  },
notificationText:{
  marginLeft:6,
  fontWeight:'bold',
  fontSize:20,
},
userImage:{
  height:60,
  width:60,
  borderRadius:40,
  borderColor:'orange',
  borderWidth:5,
  marginLeft:18,
},
followingPost:{
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  marginBottom:29,
},
followingEdit:{
  flexDirection:'row',
  alignItems:'center',
},
followingText:{
  marginLeft:15,
},
userName:{
  marginLeft:15,
  fontWeight:'bold',
},
following:{
  marginRight:18,
  padding:10,

},
suggestion:{
  marginBottom:30,
  fontSize:20,
  fontWeight:'bold',
  marginLeft:18
},
suggestionPart:{
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  marginBottom:20,
},
follows:{
  fontSize:10,
  marginLeft:18
}
})
export default Notification;
