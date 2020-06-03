const inputReducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

export default inputReducer;