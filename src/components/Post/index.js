import React from 'react';
import Post from './Post';

const Posts = ({posts}) => {
  return posts
    .map(
      ({imageUrl, caption, location, likes, comments, postedBy, ...rest}) => ({
        postImage: imageUrl,
        description: caption,
        location,
        likes,
        comments,
        username: postedBy.username,
        profileImage: postedBy.photoUrl,
        ...rest,
      }),
    )
    .map((post) => <Post key={post.pid} {...post} />);
};

Posts.defaultProps = {
  posts: [],
};

export default Posts;
