import express from 'express';
import useWrapper from '../utils/wrapper';
import UserController from '../controllers/user.controller';

class UserRoutes {
  router = express.Router();
  userController = new UserController();
  path = '/users';

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `${this.path}/`,
      useWrapper(this.userController.getAllUsers.bind(this.userController))
    );
    this.router.get(
      `${this.path}/:id`,
      useWrapper(this.userController.getUser.bind(this.userController))
    );
    this.router.post(
      `${this.path}/`,
      useWrapper(this.userController.createUser.bind(this.userController))
    );
    this.router.patch(
      `${this.path}/:id`,
      useWrapper(this.userController.updateUser.bind(this.userController))
    );
  }
}

const userRoutes = new UserRoutes();
export default userRoutes;
