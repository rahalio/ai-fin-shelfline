import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'bank' | 'distributor'>('bank');

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    sessionStorage.setItem('shelfline.role', role);
    navigate(role === 'bank' ? '/bank' : '/distributor');
  }

  return (
    <div className="login">
      <div className="login__plane" aria-hidden="true" />
      <form className="login__panel" onSubmit={onSubmit}>
        <p className="login__stamp">Shelfline</p>
        <h1>Capital-aware shelf for banking-as-a-platform</h1>
        <p className="login__lede">
          Publish deposit, lending, and payment SKUs with capital bounds —
          distributors embed under contract without burning NIM.
        </p>
        <label className="login__field">
          <span>Sign in as</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'bank' | 'distributor')}
          >
            <option value="bank">Bank operator</option>
            <option value="distributor">Distributor developer</option>
          </select>
        </label>
        <button type="submit" className="login__cta">
          Enter shelf
        </button>
      </form>
    </div>
  );
}
