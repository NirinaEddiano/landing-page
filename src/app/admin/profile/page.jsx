import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "../../../lib/auth"; 
import ProfileForm from './ProfileForm';

const prisma = new PrismaClient();

async function getAdminUser() {
  const session = await getServerSession(authOptions);
  // La condition session.user.username fonctionnera maintenant
  if (!session?.user?.username) return null;
  
  const admin = await prisma.admin.findUnique({
    where: { username: session.user.username },
    select: { id: true, username: true },
  });
  return admin;
}

export default async function ProfilePage() {
  const admin = await getAdminUser();
  if (!admin) {
    // Ce message ne devrait plus jamais apparaître si vous êtes connecté
    return <div>Utilisateur non trouvé ou session invalide. Veuillez vous reconnecter.</div>;
  }

  return (
    <div className="p-4 sm-p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>
      <ProfileForm admin={admin} />
    </div>
  );
}