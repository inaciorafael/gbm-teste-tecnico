import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import useStore from '../store'

const Routes = () => {
  const { isLogged } = useStore((state) => state)

  return isLogged() ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes
