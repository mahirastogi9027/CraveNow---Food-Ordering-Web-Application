import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import FormField from '../components/auth/FormField';
import PasswordInput from '../components/auth/PasswordInput';
import { useAuth } from '../context/AuthContext';
import { validateLoginForm } from '../utils/authValidation';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const redirectTo = location.state?.from || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (formError) setFormError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateLoginForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setFormError('');
    setSuccess('');

    try {
      const result = await login(form);
      setSuccess(result.message);
      setTimeout(() => navigate(redirectTo, { replace: true }), 600);
    } catch (error) {
      setFormError(error.message || 'Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="// Welcome Back"
      title="Sign In"
      subtitle="Access your orders, saved preferences, and secure checkout in seconds."
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {formError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
            {formError}
          </div>
        )}
        {success && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700" role="status">
            {success}
          </div>
        )}

        <FormField id="email" label="Email" error={errors.email}>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="you@example.com"
            autoComplete="email"
            className={`w-full rounded-xl border bg-canvas px-3.5 py-3 text-sm text-ink placeholder:text-subtle transition focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                : 'border-black/[0.08] focus:border-brand focus:ring-brand/20'
            }`}
          />
        </FormField>

        <FormField id="password" label="Password" error={errors.password}>
          <PasswordInput
            id="password"
            value={form.password}
            onChange={handleChange('password')}
            placeholder="Enter your password"
            autoComplete="current-password"
            hasError={!!errors.password}
          />
        </FormField>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-brand py-3.5 text-sm font-medium text-white transition-all hover:bg-brand/90 hover:shadow-[0_0_24px_rgba(255,92,0,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="font-medium text-brand transition hover:text-brand/80">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}
