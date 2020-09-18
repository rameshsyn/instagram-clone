import React from 'react';
import UserCard from './UserCard';

const UserList = ({users}) => {
  return users.map((user) => (
    <UserCard
      key={user.uid}
      photoUrl={user.photoUrl}
      username={user.username}
      fullName={user.fullName}
      user={user}
    />
  ));
};

export default UserList;
