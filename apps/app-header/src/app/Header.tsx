import React, { FunctionComponent } from 'react';
import './header.css';
import AngularLogo from './logos/AngularLogo';
import ReactLogo from './logos/ReactLogo';

const Header: FunctionComponent<HeaderProps> = ({
  routes,
  onRouteClick,
}: HeaderProps) => {
  console.info('[Header] loaded');
  const createLinkFromRoutes = ({ children, ...item }: Route): RouteLink[] => {
    const result: RouteLink[] = [{ className: 'link-parent', ...item }];
    const childrenLinks = children?.map((child: Route) => ({
      className: 'link-children',
      ...child,
    }));

    return childrenLinks ? result.concat(childrenLinks) : result;
  };

  const selectRouteLink = (routeLink: RouteLink) => onRouteClick(routeLink);

  const renderLink = (link: RouteLink) => (
    <li
      key={`${link.name}_${link.path}`}
      className={link.className}
      role="menuitem"
      onClick={() => selectRouteLink(link)}
      onKeyDown={() => selectRouteLink(link)}
    >
      {link.className === 'link-parent' ? (
        <>
          <AngularLogo />
          Application: <span className="link">{link.name}</span>
          Modules:
        </>
      ) : (
        <>
          | <span className="link">{link.name}</span> |
        </>
      )}
    </li>
  );

  return (
    <div className="toolbar" role="banner">
      <ReactLogo /> React application: Header
      <ul id="shell-nav-links">
        {routes.map((route: Route) =>
          createLinkFromRoutes(route).map((link: RouteLink) => renderLink(link))
        )}
      </ul>
    </div>
  );
};

interface Route {
  name: string;
  path: string;
  children?: Route[];
}

interface RouteLink extends Route {
  className: string;
}

interface HeaderProps {
  routes: Route[];
  onRouteClick: (routeLink: RouteLink) => void;
}

export default Header;
