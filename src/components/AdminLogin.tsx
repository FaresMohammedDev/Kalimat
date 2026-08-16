"use client";

import { useState } from "react";
import { login } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(password);
    if (res.success) {
      router.refresh();
    } else {
      setError(res.error || "Login failed");
    }
  };

  return (
    <div className="admin-card" style={{ maxWidth: '400px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            className="form-control" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        {error && <p style={{ color: 'var(--danger-accent)', marginBottom: '15px' }}>{error}</p>}
        <button type="submit" className="primary-btn" style={{ width: '100%' }}>Login</button>
      </form>
    </div>
  );
}
