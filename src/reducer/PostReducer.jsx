const PostReducer = (state, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        posts: action.payload,
      };

    default:
      break;
  }
};

export default PostReducer;
