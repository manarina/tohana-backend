// components/auth/LoginForm.tsx
'use client';

import { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { LOGIN } from '@/lib/graphql/mutations/auth.mutations';
import toast from 'react-hot-toast';

type LoginData = {
  login: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string;
      name: string;
      role: string;
    };
  };
};

export function LoginForm() {
  const router = useRouter();

  // État des étapes
  const [step, setStep] = useState<'email' | 'password'>('email');

  // États des champs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mutation GraphQL
  const [login] = useMutation<LoginData>(LOGIN);

  // ============================================================
  // VALIDATION EMAIL
  // ============================================================

  function validateEmail(): boolean {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError('Veuillez entrer votre adresse email.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      setError('Veuillez entrer une adresse email valide.');
      return false;
    }

    setEmail(normalizedEmail);
    setError('');

    return true;
  }

  // ============================================================
  // PASSAGE À L'ÉTAPE MOT DE PASSE
  // ============================================================

  function handleNextStep() {
    if (!validateEmail()) {
      return;
    }

    setStep('password');
  }

  // ============================================================
  // RETOUR À L'ÉTAPE EMAIL
  // ============================================================

  function handleBack() {
    setError('');
    setPassword('');
    setStep('email');
  }

  // ============================================================
  // CONNEXION
  // ============================================================

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');

    if (!password) {
      setError('Veuillez entrer votre mot de passe.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await login({
        variables: {
          input: {
            email: email.trim(),
            password,
          },
        },
      });

      if (response.data?.login) {
        const { accessToken, refreshToken, user } = response.data.login;

        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));

        toast.success('Connexion réussie !');

        if (!rememberMe) {
          // Le token reste stocké pendant la session actuelle
        }

        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Email ou mot de passe incorrect.',
      );
      toast.error('Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  }

  // ============================================================
  // TOUCHE ENTER SUR EMAIL
  // ============================================================

  function handleEmailKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleNextStep();
    }
  }

  // ============================================================
  // AFFICHAGE
  // ============================================================

  return (
    <div className="w-full max-w-[420px]">
      <AnimatePresence mode="wait">
        {/* ======================================================
            ÉTAPE 1 — EMAIL
        ====================================================== */}

        {step === 'email' ? (
          <motion.div
            key="email-step"
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -20,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/60 sm:p-8"
          >
            {/* ==================================================
                LOGO
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: 0.1,
              }}
              className="mb-6 text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl">🌾</span>
                <span className="text-2xl font-bold text-green-700">
                  Tohana
                </span>
              </div>
            </motion.div>

            {/* ==================================================
                HEADER
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: 0.15,
              }}
              className="mb-7 text-center"
            >
              <p className="text-sm text-gray-500">
                Connectez-vous à votre espace agricole
              </p>
            </motion.div>

            {/* ==================================================
                EMAIL
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: 0.2,
              }}
            >
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Adresse email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (error) {
                    setError('');
                  }
                }}
                onKeyDown={handleEmailKeyDown}
                autoComplete="email"
                autoFocus
                placeholder="exemple@email.mg"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
              />
            </motion.div>

            {/* ==================================================
                ERROR
            ================================================== */}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: 'auto',
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mt-0.5 h-5 w-5 shrink-0"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 8v4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="12"
                        cy="16"
                        r="1"
                        fill="currentColor"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ==================================================
                ACTIONS
            ================================================== */}

            <div className="mt-6 space-y-5">
              <motion.button
                type="button"
                onClick={handleNextStep}
                whileHover={{
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition hover:from-green-700 hover:to-green-800"
              >
                Continuer

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="m13 6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>

              {/* Register */}

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Vous n&apos;avez pas encore de compte ?{' '}
                  <Link
                    href="/auth/register"
                    className="font-semibold text-green-600 transition hover:text-green-700 hover:underline"
                  >
                    Créer un compte
                  </Link>
                </p>
              </div>

              {/* Back home */}

              <div className="border-t border-gray-100 pt-5 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-xs text-gray-400 transition hover:text-gray-600"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      d="M19 12H5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="m11 18-6-6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Retour à l&apos;accueil
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ======================================================
             ÉTAPE 2 — MOT DE PASSE
          ====================================================== */

          <motion.form
            key="password-step"
            onSubmit={handleSubmit}
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: 20,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
            className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/60 sm:p-8"
          >
            {/* ==================================================
                BACK BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={handleBack}
              disabled={isLoading}
              className="absolute left-5 top-5 rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
              aria-label="Retour"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M19 12H5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="m11 18-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* ==================================================
                LOGO
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: 0.1,
              }}
              className="mb-6 text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl">🌾</span>
                <span className="text-2xl font-bold text-green-700">
                  Tohana
                </span>
              </div>
            </motion.div>

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="mb-7 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Bon retour
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Entrez votre mot de passe
              </p>

              <p className="mt-1 text-xs text-gray-400">{email}</p>
            </div>

            {/* ==================================================
                PASSWORD
            ================================================== */}

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);

                    if (error) {
                      setError('');
                    }
                  }}
                  required
                  autoFocus
                  autoComplete="current-password"
                  placeholder="Entrez votre mot de passe"
                  disabled={isLoading}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                />

                {/* Show / hide password */}

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:text-gray-700"
                  aria-label={
                    showPassword
                      ? 'Masquer le mot de passe'
                      : 'Afficher le mot de passe'
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* ==================================================
                REMEMBER ME
            ================================================== */}

            <div className="mt-4 flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                Se souvenir de moi
              </label>

              <Link
                href="/auth/reset-password"
                className="text-xs font-medium text-green-600 transition hover:text-green-700 hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* ==================================================
                ERROR
            ================================================== */}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -5,
                  }}
                  className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ==================================================
                SUBMIT
            ================================================== */}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={
                !isLoading
                  ? {
                      scale: 1.01,
                    }
                  : undefined
              }
              whileTap={
                !isLoading
                  ? {
                      scale: 0.98,
                    }
                  : undefined
              }
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition hover:from-green-700 hover:to-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                <>
                  Se connecter
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="m13 6 6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </motion.button>

            {/* ==================================================
                REGISTER
            ================================================== */}

            <div className="mt-5 text-center">
              <p className="text-sm text-gray-500">
                Vous n&apos;avez pas encore de compte ?{' '}
                <Link
                  href="/auth/register"
                  className="font-semibold text-green-600 transition hover:text-green-700 hover:underline"
                >
                  Créer un compte
                </Link>
              </p>
            </div>

            {/* ==================================================
                FOOTER
            ================================================== */}

            <div className="mt-6 border-t border-gray-100 pt-5 text-center">
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} Tohana - Observatoire Agricole
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* ========================================================
          SECURITY MESSAGE
      ======================================================== */}

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.4,
          delay: 0.5,
        }}
        className="mt-5 text-center text-xs text-gray-400"
      >
        Vos données agricoles sont protégées et sécurisées.
      </motion.p>
    </div>
  );
}