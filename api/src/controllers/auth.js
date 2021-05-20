export default ({AuthService}) => ({
  signIn: async (req, res) => {
    const {body: {email, password}} = req;

    res.json(await AuthService.signIn({email, password}));
  },
});
