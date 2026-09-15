import { FormEvent, useState } from 'react';
import { skusApi } from '../services/api-clients';
import { useListLoader } from './BankHomePage';
import './pages.css';

export function SkusPage() {
  const { items, error, loading, reload } = useListLoader(skusApi.list);
  const [name, setName] = useState('');
  const [family, setFamily] = useState('deposit');
  const [role, setRole] = useState('manufacturer');
  const [flash, setFlash] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const created = await skusApi.create({
        name,
        productFamily: family,
        role,
        adjudicationMode: 'bank',
        manufacturingPrice: 0.35,
        priceFloor: 0.2,
        crossSubsidyDeclared: false,
      });
      const id = String(created.data.id ?? '');
      if (id) {
        await skusApi.publish(id);
        setFlash(id);
      }
      setName('');
      await reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Create failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="page">
      <header className="page__header">
        <h1>SKU publisher</h1>
        <p className="page__lede">
          Deposit, lending, and payment SKUs with role, capital bounds, price
          floor, adjudication mode, and cross-subsidy flags.
        </p>
      </header>

      <form className="form-grid" onSubmit={onCreate}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Product family
          <select value={family} onChange={(e) => setFamily(e.target.value)}>
            <option value="deposit">Deposit</option>
            <option value="lending">Lending</option>
            <option value="payment">Payment</option>
          </select>
        </label>
        <label>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="manufacturer">Manufacturer</option>
            <option value="distributor">Distributor</option>
            <option value="both">Both</option>
          </select>
        </label>
        <button className="btn btn--primary" type="submit" disabled={busy}>
          {busy ? 'Publishing…' : 'Publish capital-aware SKU'}
        </button>
      </form>

      {loading && <p className="empty">Loading SKUs…</p>}
      {error && <p className="page__error">{error}</p>}
      {!loading && items.length === 0 && (
        <p className="empty">Empty shelf — publish the first capital-aware SKU.</p>
      )}
      {items.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Family</th>
              <th>Role</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((sku) => {
              const id = String(sku.id ?? '');
              const status = String(sku.status ?? 'draft');
              return (
                <tr key={id}>
                  <td>
                    <div>{String(sku.name ?? '—')}</div>
                    <div className="mono">{id}</div>
                  </td>
                  <td>{String(sku.productFamily ?? '—')}</td>
                  <td>
                    <span className="badge">SkuCapitalBadge · {String(sku.role)}</span>
                  </td>
                  <td>
                    <span
                      className={
                        flash === id
                          ? 'badge badge--live'
                          : status === 'paused'
                            ? 'badge badge--paused'
                            : 'badge'
                      }
                    >
                      {status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn--danger"
                      onClick={async () => {
                        await skusApi.pause(id, 'Conduct / liquidity pause');
                        await reload();
                      }}
                    >
                      Pause SKU
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
}
