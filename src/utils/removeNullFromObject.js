const removeNullFromObject = (obj) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
};

export default removeNullFromObject;
