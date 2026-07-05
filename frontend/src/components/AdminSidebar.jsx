import { NavLink } from 'react-router-dom';

/**
 * AdminSidebar – navigation sidebar for admin pages
 */
const AdminSidebar = () => {
  const navItems = [
    { to: '/admin/dashboard', icon: 'bi-grid-1x2-fill', label: 'Dashboard' },
    { to: '/admin/books', icon: 'bi-book-fill', label: 'Books' },
    { to: '/admin/orders', icon: 'bi-bag-check-fill', label: 'Orders' },
    { to: '/admin/users', icon: 'bi-people-fill', label: 'Users' },
  ];

  return (
    <div
      className="glass-panel p-3 mb-4"
      style={{ minWidth: '220px' }}
    >
      <p
        className="text-uppercase mb-3"
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
        }}
      >
        Admin Panel
      </p>
      <nav className="d-flex flex-column gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `d-flex align-items-center gap-2 px-3 py-2 rounded-3 text-decoration-none transition-all ${
                isActive ? 'admin-nav-active' : 'admin-nav-item'
              }`
            }
            style={({ isActive }) => ({
              color: isActive ? 'white' : 'var(--text-secondary)',
              background: isActive
                ? 'linear-gradient(135deg, var(--primary-color), #4f46e5)'
                : 'transparent',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            <i className={`bi ${item.icon}`}></i>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
