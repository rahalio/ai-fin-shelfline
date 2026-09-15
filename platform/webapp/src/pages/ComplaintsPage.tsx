import { complaintsApi } from '../services/api-clients';
import { useListLoader } from './BankHomePage';
import './pages.css';

export function ComplaintsPage() {
  const { items, error, loading } = useListLoader(complaintsApi.list);

  return (
    <section className="page">
      <header className="page__header">
        <h1>Complaints desk</h1>
        <p className="page__lede">
          Named accountable party and time-boxed redress visible to bank conduct.
        </p>
      </header>
      {loading && <p className="empty">Loading cases…</p>}
      {error && <p className="page__error">{error}</p>}
      {items.length === 0 && !loading && (
        <p className="empty">No open cases — unowned complaints would show coral.</p>
      )}
      {items.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Case</th>
              <th>Distributor</th>
              <th>Owner</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={String(c.id)}>
                <td className="mono">{String(c.id)}</td>
                <td className="mono">{String(c.distributorId ?? '—')}</td>
                <td>
                  <span className="badge">
                    ComplaintOwnerBanner · {String(c.accountableParty ?? '—')}
                  </span>
                </td>
                <td>{String(c.status ?? 'open')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
