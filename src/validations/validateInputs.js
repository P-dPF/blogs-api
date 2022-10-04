module.exports = (schema, objectToValidate) => {
  const { error } = schema.validate(objectToValidate);
  
  return error || null;
};