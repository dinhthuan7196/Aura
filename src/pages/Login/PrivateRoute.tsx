import { FC } from 'react';
import { Navigate } from 'react-router-dom';
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  children,
}: PrivateRouteProps) => {
  // To Do: Check role admin
  if (!localStorage.getItem('access_token')) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
