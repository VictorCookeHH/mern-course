import { useDashboardContext } from '../pages/DashboardLayout'
import links from '../utils/links'
import { NavLink } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const NavLinks = ({ isBigSideBar }) => {
  const { toggleSideBar, user } = useDashboardContext()
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link
        const { role } = user
        if (path === 'admin' && role !== 'admin') return
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSideBar ? null : toggleSideBar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks
