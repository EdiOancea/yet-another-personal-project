import Bottle from 'bottlejs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import db from '../models';
import app from '../app';
import routes from '../routes';

import AuthController from '../controllers/auth';
import UserController from '../controllers/user';
import QuizController from '../controllers/quiz';
import QuizAssociationController from '../controllers/quizAssociation';
import QuestionController from '../controllers/question';

import AuthService from '../services/auth';
import ErrorService from '../services/error';
import UserService from '../services/user';
import QuizService from '../services/quiz';
import QuizAssociationService from '../services/quizAssociation';
import QuestionService from '../services/question';

import UserRepository from '../repositories/user';
import QuizRepository from '../repositories/quiz';
import QuizAssociationRepository from '../repositories/quizAssociation';
import QuestionRepository from '../repositories/question';
import GivenAnswerRepository from '../repositories/givenAnswer';

import AuthMiddleware from '../middlewares/auth';

const bottle = new Bottle();

bottle.factory('jwt', () => jwt);
bottle.factory('bcrypt', () => bcrypt);
bottle.factory('db', db);
bottle.factory('routes', routes);
bottle.factory('app', app);

bottle.factory('AuthController', AuthController);
bottle.factory('UserController', UserController);
bottle.factory('QuizController', QuizController);
bottle.factory('QuizAssociationController', QuizAssociationController);
bottle.factory('QuestionController', QuestionController);

bottle.factory('AuthService', AuthService);
bottle.factory('ErrorService', ErrorService);
bottle.factory('UserService', UserService);
bottle.factory('QuizService', QuizService);
bottle.factory('QuizAssociationService', QuizAssociationService);
bottle.factory('QuestionService', QuestionService);

bottle.factory('UserRepository', UserRepository);
bottle.factory('QuizRepository', QuizRepository);
bottle.factory('QuizAssociationRepository', QuizAssociationRepository);
bottle.factory('QuestionRepository', QuestionRepository);
bottle.factory('GivenAnswerRepository', GivenAnswerRepository);

bottle.factory('AuthMiddleware', AuthMiddleware);

export default bottle;
