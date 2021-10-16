const initialState = false;

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_THEME":
      return state;
    case "SET_THEME":
      return (state = action.isDark);
    default:
      return state;
  }
};
export default themeReducer;
