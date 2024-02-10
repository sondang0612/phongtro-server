const removeNullFromObject = (obj) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
};
module.exports = removeNullFromObject;
