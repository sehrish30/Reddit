const validateCreateProduct = (values) => {
  let errors = {};

  //Title errors
  if (!values.title) {
    errors.title = "Title is required";
  }

  //Description Errors
  if (!values.description) {
    errors.description = "Description is required";
  } else if (values.description.length < 10) {
    errors.description = "Description must be atleast 10 characters";
  }

  // URL Errors
  if (!values.url) {
    errors.url = "Url is required";
  } else if (!/^(ftp|https|https):\/\/[^ "]+$/.test(values.url)) {
    errors.password = "The URL must be valid";
  }

  return errors;
};

export default validateCreateProduct;
