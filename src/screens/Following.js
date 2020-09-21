import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {getFollowingByUserId} from '../firebase/auth';
import UserList from '../components/User';
import Loading from '../components/Loading';

const Following = ({route}) => {
  const userId = route.params.userId;
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFollowing = async () => {
    setIsLoading(true);
    try {
      setFollowing(await getFollowingByUserId(userId));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowing();
  }, []);

  return (
    <>
      <ScrollView style={styles.followingContainer}>
        {isLoading ? <Loading /> : <UserList users={following} />}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  followingContainer: {
    paddingVertical: 20,
  },
});
export default Following;
