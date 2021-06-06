export default ({UserRepository}) => ({
  create: async body => {
    const {dataValues: {password, ...rest}} = await UserRepository.create(body);

    return rest;
  },
  me: ({userId}) => UserRepository.get(userId),
});
