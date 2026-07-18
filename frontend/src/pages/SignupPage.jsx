import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import FormField from '../components/auth/FormField';
import PasswordInput from '../components/auth/PasswordInput';
import { useAuth } from '../context/AuthContext';
import { validateSignupForm } from '../utils/authValidation';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
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
    const validationErrors = validateSignupForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setFormError('');
    setSuccess('');

    try {
      const result = await signup(form);
      setSuccess(result.message);
      setTimeout(() => navigate('/', { replace: true }), 800);
    } catch (error) {
      setFormError(error.message || 'Unable to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-canvas px-3.5 py-3 text-sm text-ink placeholder:text-subtle transition focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
        : 'border-black/[0.08] focus:border-brand focus:ring-brand/20'
    }`;

  return (
    <AuthLayout
      eyebrow="// Join Crave Now"
      title="Create Account"
      subtitle="Sign up to unlock faster checkout, order tracking, and personalized recommendations."
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

        <FormField id="fullName" label="Full Name" error={errors.fullName}>
          <input
            id="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange('fullName')}
            placeholder="Alex Johnson"
            autoComplete="name"
            className={inputClass('fullName')}
          />
        </FormField>

        <FormField id="email" label="Email" error={errors.email}>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClass('email')}
          />
        </FormField>

        <FormField id="phone" label="Phone Number" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange('phone')}
            placeholder="+1 (555) 123-4567"
            autoComplete="tel"
            className={inputClass('phone')}
          />
        </FormField>

        <FormField id="password" label="Password" error={errors.password}>
          <PasswordInput
            id="password"
            value={form.password}
            onChange={handleChange('password')}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            hasError={!!errors.password}
          />
        </FormField>

        <FormField id="confirmPassword" label="Confirm Password" error={errors.confirmPassword}>
          <PasswordInput
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange('confirmPassword')}
            placeholder="Re-enter your password"
            autoComplete="new-password"
            hasError={!!errors.confirmPassword}
          />
        </FormField>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-brand py-3.5 text-sm font-medium text-white transition-all hover:bg-brand/90 hover:shadow-[0_0_24px_rgba(255,92,0,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-brand transition hover:text-brand/80">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
