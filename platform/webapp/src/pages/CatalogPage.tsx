import { skusApi } from '../services/api-clients';
import { useListLoader } from './BankHomePage';
import './pages.css';

export function CatalogPage() {
  const { items, error, loading } = useListLoader(skusApi.list);
  const published = items.filter((s) => s.status === 'published' || !s.status);

  return (
    <section className="page">
      <header className="page__header">
        <h1>Distributor catalog</h1>
        <p className="page__lede">
          Stable approved SKUs and rate cards for embed — no preferential host-only
          secret SKUs beyond policy.
        </p>
      </header>
      {loading && <p className="empty">Loading catalog…</p>}
      {error && <p className="page__error">{error}</p>}
      {published.length === 0 && !loading && (
        <p className="empty">Catalog empty — wait for bank publish with capital bounds.</p>
      )}
      {published.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Family</th>
              <th>Manufacturing price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {published.map((sku) => (
              <tr key={String(sku.id)}>
                <td>
                  {String(sku.name ?? '—')}
                  <div className="mono">{String(sku.id)}</div>
                </td>
                <td>{String(sku.productFamily ?? '—')}</td>
                <td>
                  <span className="badge">
                    ManufacturingPriceLine · {String(sku.manufacturingPrice ?? '—')}
                  </span>
                </td>
                <td>
                  <span className="badge badge--live">{String(sku.status ?? 'published')}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
