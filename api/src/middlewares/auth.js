export default ({jwt, ErrorService: {throwAuthorizationError}}) => (req, _res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    throwAuthorizationError();
  }

  req.loggedUser = jwt.verify(authorizationHeader.slice(7), process.env.SECRET_KEY) || {userId: -1};
  next();
};
