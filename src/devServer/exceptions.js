import ERROR_RESPONSES from "./errorReponses";

export const handleBadRequest = (req, res, next) => {
  const { error400 } = ERROR_RESPONSES;

  try {
    throw new Error(error400.error, { cause: error400.error_code });
  } catch (error) {
    next(error);
  }
  console.debug(
    `[ERROR] Bad request "${req.method}" to "${req.url}". ${new Date()}`
  );
};

export const handleBadMethod = (req, res, next) => {
  const { error405 } = ERROR_RESPONSES;

  try {
    throw new Error(error405.error, { cause: error405.error_code });
  } catch (error) {
    next(error);
  }
  console.debug(
    `[ERROR] Requested method "${req.method}" not allowed. ${new Date()}`
  );
};

export const handleInvalidEndpoint = (req, res, next) => {
  const { error404 } = ERROR_RESPONSES;

  try {
    throw new Error(error404.error, { cause: error404.error_code });
  } catch (error) {
    next(error);
  }
  console.debug(
    `[ERROR] Requested endpoint "${req.url}" does not exist. ${new Date()}`
  );
};

export const handleUnknownError = (err, req, res, next) => {
  const { error500 } = ERROR_RESPONSES;

  try {
    throw new Error(error500.error, { cause: error500.error_code });
  } catch (error) {
    next(error);
  }
  console.debug(
    `[ERROR] Unknown server error on request "${req.method}" to "${
      req.url
    }". Cause: ${err}. ${new Date()}`
  );
};
