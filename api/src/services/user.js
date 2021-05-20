export default ({UserRepository}) => ({
  create: UserRepository.create,
  me: async loggedUser => {
    const {userId} = loggedUser;

    return await UserRepository.get(userId);
  },
});
