const HTTP_RESPONSES = {
  400: "Bad Request",
  404: "Not Found",
  405: "Method not Allowed",
  500: "Server Error",
};

const ERROR_MESSAGES = {
  not_found: "The requested resource cannot be found.",
  not_allowed: "Are you using the correct http method?",
  bad_request:
    "Your request is incorrect and cannot be processed. Please double check it.",
  server_error:
    "That's very embarassing, but something has failed on the backend... :(",
};

const error400 = {
  success: false,
  error_code: 400,
  error: HTTP_RESPONSES[400],
  message: ERROR_MESSAGES["bad_request"],
};

const error404 = {
  success: false,
  error_code: 404,
  error: HTTP_RESPONSES[404],
  message: ERROR_MESSAGES["not_found"],
};

const error405 = {
  success: false,
  error_code: 405,
  error: HTTP_RESPONSES[405],
  message: ERROR_MESSAGES["not_allowed"],
};

const error500 = {
  success: false,
  error_code: 500,
  error: HTTP_RESPONSES[500],
  message: ERROR_MESSAGES["server_error"],
};

export default {
  error400,
  error404,
  error405,
  error500,
};
