"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  discountType: string;
  discountValue: number;
  maxUses: number;
  usedCount: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    code: "",
    discountType: "PERCENTAGE",
    discountValue: 10,
    maxUses: 100,
    validTo: "",
  });

  useEffect(() => {
    loadCoupons();
  }, []);

  async function loadCoupons() {
    const res = await fetch("/api/admin/coupons");
    if (res.ok) {
      const data = await res.json();
      setCoupons(data);
    }
    setLoading(false);
  }

  async function createCoupon(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/admin/coupons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setShowForm(false);
      setForm({ code: "", discountType: "PERCENTAGE", discountValue: 10, maxUses: 100, validTo: "" });
      loadCoupons();
    }
    setSaving(false);
  }

  async function toggleCoupon(id: string, isActive: boolean) {
    await fetch(`/api/admin/coupons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });
    loadCoupons();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-green-900">Coupons</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create Coupon
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <form onSubmit={createCoupon} className="bg-white rounded-xl border border-green-200/50 p-6 mb-6 shadow-sm">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1.5">Code</label>
              <input
                type="text"
                required
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                placeholder="SAVE20"
                className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm text-green-900 font-mono focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1.5">Type</label>
              <select
                value={form.discountType}
                onChange={(e) => setForm({ ...form, discountType: e.target.value })}
                className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm bg-white text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FIXED">Fixed Amount (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1.5">
                Value ({form.discountType === "PERCENTAGE" ? "%" : "₹"})
              </label>
              <input
                type="number"
                required
                min={1}
                value={form.discountValue}
                onChange={(e) => setForm({ ...form, discountValue: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1.5">Max Uses</label>
              <input
                type="number"
                required
                min={1}
                value={form.maxUses}
                onChange={(e) => setForm({ ...form, maxUses: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1.5">Valid Until</label>
              <input
                type="date"
                required
                value={form.validTo}
                onChange={(e) => setForm({ ...form, validTo: e.target.value })}
                className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm text-green-700 hover:text-green-900 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 disabled:opacity-50 transition shadow-sm"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Create
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-green-200/50 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-green-200/50 bg-green-50/50">
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Code</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Discount</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Usage</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Valid Until</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Status</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-100/50">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-green-50/50 transition-colors">
                  <td className="px-5 py-3 font-mono font-medium text-green-900">{c.code}</td>
                  <td className="px-5 py-3 text-green-700">
                    {c.discountType === "PERCENTAGE" ? `${c.discountValue}%` : `₹${c.discountValue}`}
                  </td>
                  <td className="px-5 py-3 text-green-700">
                    {c.usedCount} / {c.maxUses}
                  </td>
                  <td className="px-5 py-3 text-green-500/50 text-xs">
                    {new Date(c.validTo).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      c.isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                    }`}>
                      {c.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => toggleCoupon(c.id, c.isActive)}
                      className="text-xs font-medium text-green-700 hover:text-green-900 transition"
                    >
                      {c.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-green-500/50">
                    No coupons created yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
