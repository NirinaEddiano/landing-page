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
  const slug = formData.get('slug'); // Récupérer le slug pour la révalidation

  let heroImageUrl;

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
    const dataToUpdate = {
      title,
      description,
      content,
      slug: `${slugify(title)}-${Date.now().toString().slice(-4)}`,
      ...(heroImageUrl && { heroImage: heroImageUrl }),
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
  if (slug) {
    revalidatePath(`/articles/${slug}`);
  }
  redirect('/admin/dashboard');
}

export async function deletePost(postId) {
  try {
    const postToDelete = await prisma.post.findUnique({ where: { id: postId } });
    if (postToDelete && postToDelete.heroImage) {
      const fileName = postToDelete.heroImage.split('/').pop();
      await supabase.storage.from('blog-images').remove([fileName]);
    }

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