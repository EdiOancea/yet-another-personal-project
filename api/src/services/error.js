export default () => {
  const throwGenericError = (message, status) => {
    const error = new Error(message);
    error.status = status;

    throw error;
  };

  return {
    throwValidationError: (message = 'Validation error.') => throwGenericError(message, 422),
    throwConflictError: (message = 'Conflict error.') => throwGenericError(message, 409),
    throwAuthorizationError: (message = 'Unauthorized.') => throwGenericError(message, 403),
  };
};
