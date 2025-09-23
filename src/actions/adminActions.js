"use server";
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function updateProfile(adminId, prevState, formData) {
  const username = formData.get('username');
  const newPassword = formData.get('newPassword');
  const confirmPassword = formData.get('confirmPassword');

  if (!username) {
    return { message: "Le nom d'utilisateur est requis.", type: 'error' };
  }

  const dataToUpdate = { username };

  if (newPassword) {
    if (newPassword !== confirmPassword) {
      return { message: "Les mots de passe ne correspondent pas.", type: 'error' };
    }
    if (newPassword.length < 6) {
      return { message: "Le mot de passe doit faire au moins 6 caractères.", type: 'error' };
    }
    dataToUpdate.password = await hash(newPassword, 12);
  }

  try {
    await prisma.admin.update({
      where: { id: adminId },
      data: dataToUpdate,
    });
  } catch (e) {
    // Gérer le cas où le nom d'utilisateur est déjà pris
    if (e.code === 'P2002') {
      return { message: "Ce nom d'utilisateur est déjà pris.", type: 'error' };
    }
    return { message: "Une erreur est survenue.", type: 'error' };
  }
  
  revalidatePath('/admin/profile');
  return { message: "Profil mis à jour avec succès !", type: 'success' };
}