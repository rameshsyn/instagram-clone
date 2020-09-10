import React from 'react';
import Post from './Post';

const Posts = ({posts}) => {
  return posts.map((post, i) => <Post key={i} {...post} />);
};

Posts.defaultProps = {
  posts: [],
};

export default Posts;
