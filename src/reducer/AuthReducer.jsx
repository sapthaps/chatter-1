const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };

    default:
      break;
  }
};

export default AuthReducer;
