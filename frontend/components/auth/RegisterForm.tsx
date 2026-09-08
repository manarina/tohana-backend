// components/auth/RegisterForm.tsx
'use client';

import { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { REGISTER } from '@/lib/graphql/mutations/auth.mutations';
import toast from 'react-hot-toast';

interface RegisterResponse {
  register: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string;
      name: string;
      role: string;
    };
  };
}

export function RegisterForm() {
  const router = useRouter();

  // États des champs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // État de validation du mot de passe
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // Mutation GraphQL
  const [register] = useMutation<RegisterResponse>(REGISTER);

  // ============================================================
  // VALIDATION DU MOT DE PASSE
  // ============================================================

  function validatePassword(password: string) {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    });
  }

  // ============================================================
  // VALIDATION EMAIL
  // ============================================================

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  // ============================================================
  // INSCRIPTION
  // ============================================================

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');

    // Validation du nom
    if (!name.trim()) {
      setError('Veuillez entrer votre nom complet.');
      return;
    }

    // Validation de l'email
    if (!validateEmail(email)) {
      setError('Veuillez entrer une adresse email valide.');
      return;
    }

    // Validation du mot de passe
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    if (!passwordValidation.uppercase) {
      setError('Le mot de passe doit contenir au moins une majuscule.');
      return;
    }

    if (!passwordValidation.number) {
      setError('Le mot de passe doit contenir au moins un chiffre.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await register({
        variables: {
          input: {
            email: email.trim(),
            password,
            name: name.trim(),
          },
        },
      });

      if (response.data?.register) {
        const { accessToken, refreshToken, user } = response.data.register;

        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));

        toast.success('Compte créé avec succès !');
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Erreur lors de la création du compte.',
      );
      toast.error('Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  }

  // ============================================================
  // AFFICHAGE
  // ============================================================

  const isPasswordValid = 
    passwordValidation.length &&
    passwordValidation.uppercase &&
    passwordValidation.lowercase &&
    passwordValidation.number &&
    passwordValidation.special;

  return (
    <div className="w-full max-w-[420px]">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          ease: 'easeOut',
        }}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/60 sm:p-8"
      >
        {/* ======================================================
            LOGO
        ====================================================== */}

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

        {/* ======================================================
            HEADER
        ====================================================== */}

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
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Créer un compte
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Rejoignez la communauté agricole Tohana
          </p>
        </motion.div>

        {/* ======================================================
            FORMULAIRE
        ====================================================== */}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NOM COMPLET */}

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
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Nom complet
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (error) setError('');
              }}
              autoFocus
              placeholder="Votre nom complet"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
            />
          </motion.div>

          {/* EMAIL */}

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
              delay: 0.25,
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
                if (error) setError('');
              }}
              placeholder="exemple@email.mg"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
            />
          </motion.div>

          {/* MOT DE PASSE */}

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
              delay: 0.3,
            }}
          >
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
                  const value = event.target.value;
                  setPassword(value);
                  validatePassword(value);
                  if (error) setError('');
                }}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
              />

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

            {/* Validation du mot de passe */}

            <AnimatePresence>
              {password.length > 0 && (
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
                  className="mt-3 space-y-1.5 overflow-hidden"
                >
                  <div className="flex items-center gap-2 text-xs">
                    {passwordValidation.length ? (
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-3.5 w-3.5 text-gray-300" />
                    )}
                    <span
                      className={
                        passwordValidation.length
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }
                    >
                      Au moins 8 caractères
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    {passwordValidation.uppercase ? (
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-3.5 w-3.5 text-gray-300" />
                    )}
                    <span
                      className={
                        passwordValidation.uppercase
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }
                    >
                      Au moins une majuscule
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    {passwordValidation.lowercase ? (
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-3.5 w-3.5 text-gray-300" />
                    )}
                    <span
                      className={
                        passwordValidation.lowercase
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }
                    >
                      Au moins une minuscule
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    {passwordValidation.number ? (
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-3.5 w-3.5 text-gray-300" />
                    )}
                    <span
                      className={
                        passwordValidation.number
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }
                    >
                      Au moins un chiffre
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    {passwordValidation.special ? (
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-3.5 w-3.5 text-gray-300" />
                    )}
                    <span
                      className={
                        passwordValidation.special
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }
                    >
                      Au moins un caractère spécial
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ======================================================
              ERREUR
          ====================================================== */}

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
                className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ======================================================
              BOUTON D'INSCRIPTION
          ====================================================== */}

          <motion.button
            type="submit"
            disabled={isLoading || (password.length > 0 && !isPasswordValid)}
            whileHover={
              !isLoading && !(password.length > 0 && !isPasswordValid)
                ? {
                    scale: 1.01,
                  }
                : undefined
            }
            whileTap={
              !isLoading && !(password.length > 0 && !isPasswordValid)
                ? {
                    scale: 0.98,
                  }
                : undefined
            }
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition hover:from-green-700 hover:to-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Création en cours...
              </>
            ) : (
              <>
                Créer mon compte
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

          {/* ======================================================
              LIEN CONNEXION
          ====================================================== */}

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Déjà un compte ?{' '}
              <Link
                href="/auth/login"
                className="font-semibold text-green-600 transition hover:text-green-700 hover:underline"
              >
                Se connecter
              </Link>
            </p>
          </div>

          {/* ======================================================
              FOOTER
          ====================================================== */}

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
        </form>
      </motion.div>

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