import authRoutes from './auth.route';
import urlRoutes from './url.route';
import userRoutes from './user.route';

const routes = [urlRoutes.router, userRoutes.router, authRoutes.router];

export default routes;
