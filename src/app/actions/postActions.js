"use server";

import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export async function addPost(prevState, formData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const content = formData.get('content');
  const heroImageFile = formData.get('heroImage');

  if (!title || !description || !content || !heroImageFile || heroImageFile.size === 0) {
    return { message: 'Tous les champs sont requis.' };
  }

  const fileName = `${Date.now()}-${heroImageFile.name}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('blog-images')
    .upload(fileName, heroImageFile);

  if (uploadError) {
    console.error('Upload Error:', uploadError);
    return { message: "Erreur lors de l'upload de l'image." };
  }

  const { data: publicUrlData } = supabase.storage
    .from('blog-images')
    .getPublicUrl(fileName);
    
  const heroImageUrl = publicUrlData.publicUrl;

  try {
    await prisma.post.create({
      data: {
        title,
        slug: `${slugify(title)}-${Date.now().toString().slice(-4)}`,
        description,
        content,
        heroImage: heroImageUrl,
        published: true,
      },
    });
  } catch (e) {
    console.error(e);
    return { message: 'Erreur lors de la création de l_article.' };
  }

  revalidatePath('/admin/dashboard');
  revalidatePath('/articles');
  redirect('/admin/dashboard');
}


export async function updatePost(postId, prevState, formData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const content = formData.get('content');
  const heroImageFile = formData.get('heroImage');

  let heroImageUrl;

  // Si une nouvelle image a été fournie, on l'uploade
  if (heroImageFile && heroImageFile.size > 0) {
    const fileName = `${Date.now()}-${heroImageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, heroImageFile);

    if (uploadError) {
      console.error('Upload Error:', uploadError);
      return { message: "Erreur lors de l'upload de la nouvelle image." };
    }
    
    heroImageUrl = supabase.storage.from('blog-images').getPublicUrl(fileName).data.publicUrl;
  }

  try {
    // On construit l'objet de mise à jour.
    // L'URL de l'image n'est incluse que si une nouvelle image a été uploadée.
    const dataToUpdate = {
      title,
      description,
      content,
      slug: `${slugify(title)}-${Date.now().toString().slice(-4)}`, // On regénère un slug au cas où le titre change
      ...(heroImageUrl && { heroImage: heroImageUrl }), // Syntaxe pour ajouter conditionnellement une propriété
    };

    await prisma.post.update({
      where: { id: postId },
      data: dataToUpdate,
    });
  } catch (e) {
    console.error(e);
    return { message: 'Erreur lors de la mise à jour de l_article.' };
  }

  revalidatePath('/admin/dashboard');
  revalidatePath(`/articles`);
  revalidatePath(`/articles/${formData.get('slug')}`); // Invalider l'ancienne page si le slug change
  redirect('/admin/dashboard');
}

// ... (gardez les fonctions addPost et updatePost)

import { del } from '@vercel/blob'; // Si vous utilisez Vercel Blob, sinon, utilisez la méthode de Supabase
// ...
export async function deletePost(postId) {
  try {
    // Optionnel mais recommandé : Supprimer l'image du stockage pour économiser de l'espace
    const postToDelete = await prisma.post.findUnique({ where: { id: postId } });
    if (postToDelete && postToDelete.heroImage) {
      const fileName = postToDelete.heroImage.split('/').pop(); // Extrait le nom du fichier de l'URL
      await supabase.storage.from('blog-images').remove([fileName]);
    }

    // Supprimer le post de la base de données
    await prisma.post.delete({
      where: { id: postId },
    });
  } catch (e) {
    console.error(e);
    return { message: 'Erreur lors de la suppression de l_article.' };
  }

  revalidatePath('/admin/dashboard');
  revalidatePath('/articles');
}