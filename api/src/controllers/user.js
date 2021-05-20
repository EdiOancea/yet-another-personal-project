export default ({UserService}) => ({
  create: async (req, res) => {
    const {body: {email, password, type, firstName, lastName}} = req;

    res.json(await UserService.create({email, password, type, firstName, lastName}));
  },
  me: async (req, res) => {
    const {loggedUser} = req;

    res.json(await UserService.me(loggedUser));
  },
});
