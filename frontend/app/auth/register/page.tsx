// app/auth/register/page.tsx
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-green-50/30 py-12 px-4">
      <RegisterForm />
    </div>
  );
}