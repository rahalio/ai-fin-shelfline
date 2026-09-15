import { originationsApi } from '../services/api-clients';
import { useListLoader } from './BankHomePage';
import './pages.css';

export function OriginationsPage({ portal = false }: { portal?: boolean }) {
  const { items, error, loading } = useListLoader(originationsApi.list);

  return (
    <section className="page">
      <header className="page__header">
        <h1>{portal ? 'Distributor originations' : 'Origination & adjudication'}</h1>
        <p className="page__lede">
          Partner applications with bank / partner-within-policy / dual-control
          modes; exposure blocks show as explicit codes.
        </p>
      </header>
      {loading && <p className="empty">Loading applications…</p>}
      {error && <p className="page__error">{error}</p>}
      {items.length === 0 && !loading && (
        <p className="empty">
          No applications — saturated leverage returns a block, not a spinner void.
        </p>
      )}
      {items.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Application</th>
              <th>SKU</th>
              <th>Distributor</th>
              <th>Status</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            {items.map((app) => (
              <tr key={String(app.id)}>
                <td className="mono">{String(app.id)}</td>
                <td className="mono">{String(app.skuId ?? '—')}</td>
                <td className="mono">{String(app.distributorId ?? '—')}</td>
                <td>
                  <span
                    className={
                      app.status === 'throttled'
                        ? 'badge badge--warn'
                        : 'badge'
                    }
                  >
                    {String(app.status ?? '—')}
                  </span>
                </td>
                <td>
                  <span className="badge">AdjudicationModeChip</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!portal && (
        <p className="page__lede">
          <span className="badge badge--warn">ExposureBlockBadge</span> Multi-platform
          leverage stops booking when ingest signals block.
        </p>
      )}
    </section>
  );
}
