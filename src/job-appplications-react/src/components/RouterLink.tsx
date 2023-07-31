import { ReactNode } from 'react';
import { Link } from "react-router-dom";

const RouterLink = ({
  href,
  children,
  ...rest
}: {
  href: string,
  children: ReactNode,
}): JSX.Element => (
  <Link to={href} {...rest}>{children}</Link>
);

export default RouterLink;