import authRoutes from './auth.route';
import urlRoutes from './url.route';
import userRoutes from './user.route';

const routes = [authRoutes.router, urlRoutes.router, userRoutes.router];

export default routes;
