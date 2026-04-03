"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loader2, Save, Crown, Lock } from "lucide-react";
import Link from "next/link";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  studentClass: string;
  stream: string;
  city: string;
  isPremium: boolean;
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    studentClass: "",
    stream: "",
    city: "",
  });

  useEffect(() => {
    async function loadProfile() {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setForm({
          name: data.name || "",
          phone: data.phone || "",
          studentClass: data.studentClass || "",
          stream: data.stream || "",
          city: data.city || "",
        });
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage("Profile updated successfully!");
    } else {
      setMessage("Failed to update profile.");
    }
    setSaving(false);
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMsg("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg("Passwords do not match.");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordMsg("Password must be at least 8 characters.");
      return;
    }

    setPasswordSaving(true);
    const res = await fetch("/api/profile/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      }),
    });

    if (res.ok) {
      setPasswordMsg("Password changed successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      const data = await res.json();
      setPasswordMsg(data.error || "Failed to change password.");
    }
    setPasswordSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-green-500/60" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-green-900 mb-1">Your Profile</h1>
      <p className="text-sm text-green-700/60 mb-6">
        Manage your account details and preferences.
      </p>

      {/* Plan badge */}
      <div className="bg-white rounded-2xl border border-green-200/50 p-4 mb-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${profile?.isPremium ? "bg-gradient-to-br from-green-800 to-green-900" : "bg-green-50"}`}>
            <Crown className={`w-5 h-5 ${profile?.isPremium ? "text-yellow-400" : "text-green-400"}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-green-900">
              {profile?.isPremium ? "Premium Member" : "Free Plan"}
            </p>
            <p className="text-xs text-green-600/60">
              {profile?.isPremium ? "All reports unlocked" : "Pay per report (₹99 each)"}
            </p>
          </div>
        </div>
        {!profile?.isPremium && (
          <Link
            href="/subscribe"
            className="text-xs font-medium bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg hover:from-red-600 hover:to-red-700 transition shadow-sm"
          >
            Upgrade
          </Link>
        )}
      </div>

      {/* Profile form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-green-200/50 p-6 sm:p-8 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1.5">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2.5 border border-green-200 rounded-lg text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-800 mb-1.5">Email</label>
            <input
              type="email"
              value={session?.user?.email || ""}
              disabled
              className="w-full px-3 py-2.5 border border-green-100 bg-green-50/50 rounded-lg text-sm text-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-800 mb-1.5">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2.5 border border-green-200 rounded-lg text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1.5">Class</label>
              <select
                value={form.studentClass}
                onChange={(e) => setForm({ ...form, studentClass: e.target.value })}
                className="w-full px-3 py-2.5 border border-green-200 rounded-lg text-sm bg-white text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
                <option value="Inter 1st Year">Inter 1st Year</option>
                <option value="Inter 2nd Year">Inter 2nd Year</option>
                <option value="Degree">Degree</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1.5">Stream</label>
              <select
                value={form.stream}
                onChange={(e) => setForm({ ...form, stream: e.target.value })}
                className="w-full px-3 py-2.5 border border-green-200 rounded-lg text-sm bg-white text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="MPC">MPC</option>
                <option value="BiPC">BiPC</option>
                <option value="CEC">CEC</option>
                <option value="HEC">HEC</option>
                <option value="MEC">MEC</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-800 mb-1.5">City</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full px-3 py-2.5 border border-green-200 rounded-lg text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>
        </div>

        {message && (
          <p className={`text-sm mt-4 ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-green-700 to-green-800 text-white py-3 rounded-xl text-sm font-semibold hover:from-green-800 hover:to-green-900 disabled:opacity-50 transition shadow-lg shadow-green-900/10"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </form>

      {/* Change Password */}
      <form onSubmit={handlePasswordChange} className="bg-white rounded-2xl border border-green-200/50 p-6 sm:p-8 mt-6 shadow-sm">
        <h2 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-green-700" />
          Change Password
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1.5">Current Password</label>
            <input
              type="password"
              required
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              className="w-full px-3 py-2.5 border border-green-200 rounded-lg text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1.5">New Password</label>
            <input
              type="password"
              required
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="w-full px-3 py-2.5 border border-green-200 rounded-lg text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1.5">Confirm New Password</label>
            <input
              type="password"
              required
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              className="w-full px-3 py-2.5 border border-green-200 rounded-lg text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>
        </div>

        {passwordMsg && (
          <p className={`text-sm mt-4 ${passwordMsg.includes("success") ? "text-green-600" : "text-red-500"}`}>
            {passwordMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={passwordSaving}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl text-sm font-semibold hover:from-red-600 hover:to-red-700 disabled:opacity-50 transition shadow-lg shadow-red-600/10"
        >
          {passwordSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Changing...
            </>
          ) : (
            "Change Password"
          )}
        </button>
      </form>

      <p className="text-xs text-green-500/50 text-center mt-4">
        Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "—"}
      </p>
    </div>
  );
}
