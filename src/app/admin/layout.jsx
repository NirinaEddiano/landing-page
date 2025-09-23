import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { SignOutButton } from '../../components/authButtons';// Nous allons créer ce composant

const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="text-xl font-bold text-gray-800">
                MuntuLabs - Admin
              </Link>
            </div>
            <div className="flex items-center gap-4">
            <Link href="/admin/profile" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <UserCircleIcon className="h-6 w-6" />
              Mon Profil
            </Link>
            <SignOutButton />
          </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}