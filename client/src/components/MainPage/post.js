import React from 'react';

const Post = React.forwardRef(({ post }, ref) => {
  const postBody = (
    <>
      <h2>{post.title}</h2>
      <p>{post.summary}</p>
      <p>{post.tags}</p>
      {/* <p>{post.step}</p> */}
    </>
  );

  const content = ref ? (
    <article ref={ref}>{postBody}</article>
  ) : (
    <article>{postBody}</article>
  );

  return content;
});

export default Post;
