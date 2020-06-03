const isEmptyObject = obj => {
  if (!obj) {
    return true;
  }
  return Object.keys(obj).length === 0;
};

export default isEmptyObject;