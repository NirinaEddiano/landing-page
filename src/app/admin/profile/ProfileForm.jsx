"use client";
import { useFormState } from 'react-dom';
import { updateProfile } from '../../../actions/adminActions'; // Nous allons créer ce fichier
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const initialState = { message: null, type: null };

const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>;


export default function ProfileForm({ admin }) {
    const router = useRouter();
  const updateProfileWithId = updateProfile.bind(null, admin.id);
  const [formState, formAction] = useFormState(updateProfileWithId, initialState);

  useEffect(() => {
    if (formState?.type === 'success') {
      // Si l'action a réussi, attendre un peu pour que l'utilisateur voie le message
      const timer = setTimeout(() => {
        router.push('/admin/dashboard'); // Rediriger vers le tableau de bord
      }, 1500); // 1.5 secondes de délai

      return () => clearTimeout(timer); // Nettoyer le timer
    }
  }, [formState, router]);

  return (
    <form action={formAction} className="space-y-6 max-w-lg">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
        <input type="text" name="username" id="username" required defaultValue={admin.username} className="..." />
      </div>
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nouveau mot de passe (laisser vide pour ne pas changer)</label>
        <input type="password" name="newPassword" id="newPassword" className="..." />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmer le nouveau mot de passe</label>
        <input type="password" name="confirmPassword" id="confirmPassword" className="..." />
      </div>
      
      <div className="pt-4 flex items-center gap-4">
        <button 
          type="submit" 
          className="inline-flex items-center gap-2 justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
        >
          <SaveIcon />
          Enregistrer les modifications
        </button>
      </div>

      {formState?.message && (
        <p className={`mt-2 text-sm ${formState.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {formState.message}
        </p>
      )}
    </form>
  );
}