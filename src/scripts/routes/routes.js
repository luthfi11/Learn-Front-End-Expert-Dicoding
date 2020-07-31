import Home from '../view/pages/home';
import Favorite from '../view/pages/favorite';
import Detail from '../view/pages/detail';

const routes = {
  '/': Home,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
