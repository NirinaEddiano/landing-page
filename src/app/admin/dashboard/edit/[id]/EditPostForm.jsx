"use client";

import { useState } from 'react';
import { useFormState } from 'react-dom';
import TiptapEditor from '@/components/TiptapEditor';
import { updatePost } from '@/app/actions/postActions'; // Nous allons créer cette nouvelle action
import Image from 'next/image';

const initialState = { message: null };

export default function EditPostForm({ post }) {
  // Pré-remplir le contenu de l'éditeur
  const [content, setContent] = useState(post.content);

  // On passe l'ID de l'article à l'action `updatePost`
  const updatePostWithId = updatePost.bind(null, post.id);
  const [formState, formAction] = useFormState(updatePostWithId, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre de l'article</label>
        <input type="text" name="title" id="title" required defaultValue={post.title} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description courte</label>
        <textarea name="description" id="description" rows={3} required defaultValue={post.description} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"></textarea>
      </div>
      
      <div>
        <label htmlFor="heroImage" className="block text-sm font-medium text-gray-700">Changer l'image principale (optionnel)</label>
        <div className="mt-2 flex items-center gap-4">
            <Image src={post.heroImage} alt="Image actuelle" width={120} height={80} className="rounded-md object-cover" />
            <input type="file" name="heroImage" id="heroImage" accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contenu de l'article</label>
        <input type="hidden" name="content" value={content} />
        <TiptapEditor content={content} onChange={(newContent) => setContent(newContent)} />
      </div>
      
      <div>
        <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Mettre à jour
        </button>
      </div>

      {formState?.message && <p className="mt-2 text-sm text-red-600">{formState.message}</p>}
    </form>
  );
}