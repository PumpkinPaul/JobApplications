import { ReactNode } from 'react';
import { Link } from "react-router-dom";

export default function RouterLink({
  href,
  children,
  ...rest
}: {
  href: string,
  children: ReactNode,
}): JSX.Element {
  return <Link to={href} {...rest}>{children}</Link>
};