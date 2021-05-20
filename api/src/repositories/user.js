export default ({db: {User}}) => ({
  create: async body => {
    const {dataValues: {password, ...rest}} = await User.create({...body, active: false});

    return rest;
  },
  getByEmail: email => User.findOne({
    where: {email},
    attributes: {include: 'password'},
  }),
  get: id => User.findByPk(id),
  getAllStudents: () => User.findAll({where: {type: 'student'}, raw: true}),
});
