const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return (state = { ...action.payload });
    case "GET_USER_DATA":
      return action.payload;
    case "REMOVE_USER_DATA":
      return (state = null);
    default:
      return state;
  }
};
export default userReducer;
