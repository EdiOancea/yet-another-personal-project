export default ({
  UserRepository,
  jwt,
  bcrypt,
  ErrorService: {throwValidationError},
}) => ({
  signIn: async ({email, password}) => {
    const user = await UserRepository.getByEmail((email || '').toLowerCase());

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throwValidationError('Invalid credentials');
    }

    const {id: userId, type: userType} = user;

    return {token: jwt.sign({userId, userType}, process.env.SECRET_KEY)};
  },
});
