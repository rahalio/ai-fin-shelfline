import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import './shell.css';

const bankNav = [
  { to: '/bank', label: 'Shelf home', end: true },
  { to: '/bank/skus', label: 'SKU publish' },
  { to: '/bank/distributors', label: 'Distributors' },
  { to: '/bank/originations', label: 'Originations' },
  { to: '/bank/throttles', label: 'Treasury throttles' },
  { to: '/bank/pause', label: 'Pause controls' },
  { to: '/bank/telemetry', label: 'Margin & CAC' },
  { to: '/bank/complaints', label: 'Complaints' },
  { to: '/bank/breaches', label: 'Breaches' },
  { to: '/bank/fairness', label: 'Channel fairness' },
];

const distNav = [
  { to: '/distributor', label: 'Catalog', end: true },
  { to: '/distributor/originations', label: 'Originations' },
];

export function Shell({
  mode,
  children,
}: {
  mode: 'bank' | 'distributor';
  children?: ReactNode;
}) {
  const navigate = useNavigate();
  const nav = mode === 'bank' ? bankNav : distNav;

  return (
    <div className={`shell shell--${mode}`}>
      <aside className="shell__rail">
        <div className="shell__brand">
          <span className="shell__stamp">Shelfline</span>
          <span className="shell__mode">
            {mode === 'bank' ? 'Bank shelf console' : 'Distributor portal'}
          </span>
        </div>
        <nav className="shell__nav" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? 'shell__link shell__link--active' : 'shell__link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="shell__logout"
          onClick={() => {
            sessionStorage.removeItem('shelfline.role');
            navigate('/');
          }}
        >
          Sign out
        </button>
      </aside>
      <main className="shell__main">{children ?? <Outlet />}</main>
    </div>
  );
}
