import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {getFollowersByUserId} from '../firebase/auth';
import UserList from '../components/User';
import BottomTab from '../components/BottomTab';
import Loading from '../components/Loading';

const Followers = ({route}) => {
  const userId = route.params.userId;
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFollowers = async () => {
    setIsLoading(true);
    try {
      setFollowers(await getFollowersByUserId(userId));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchFollowers();
  }, []);
  return (
    <>
      <ScrollView style={styles.followersContainer}>
        {isLoading ? <Loading /> : <UserList users={followers} />}
      </ScrollView>
      <BottomTab />
    </>
  );
};

const styles = StyleSheet.create({
  followersContainer: {
    marginTop: 10,
    padding: 10,
  },
});
export default Followers;
