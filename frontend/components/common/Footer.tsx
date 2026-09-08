// components/common/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Tohana - Observatoire Agricole
          </p>
          <p className="text-sm text-gray-400">
            Made with ❤️ for Madagascar
          </p>
        </div>
      </div>
    </footer>
  );
}