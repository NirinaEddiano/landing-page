"use client";

import { useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { addPost } from  "../../../../actions/postActions";

const TiptapEditor = dynamic(() => import('../../../../components/TiptapEditor'), { ssr: false });

const initialState = {
message: null,
};

export default function NewPostPage() {
const [content, setContent] = useState('');
const [formState, formAction] = useFormState(addPost, initialState);

return (
    <div className="p-4 sm:p-8 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Créer un nouvel article</h1>
        <Link href="/admin/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">Annuler</Link>
      </div>
      
      <form action={formAction} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre de l'article</label>
          <input type="text" name="title" id="title" required className="..." placeholder="Un titre accrocheur pour votre article" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description courte (pour l'aperçu)</label>
          <textarea name="description" id="description" rows={3} required className="..." placeholder="Un résumé concis de 1-2 phrases"></textarea>
        </div>
        <div>
          <label htmlFor="heroImage" className="block text-sm font-medium text-gray-700">Image principale</label>
          <input type="file" name="heroImage" id="heroImage" required accept="image/*" className="..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contenu de l'article</label>
          <input type="hidden" name="content" value={content} />
          <TiptapEditor content={content} onChange={(newContent) => setContent(newContent)} />
        </div>
        <div className="flex items-center gap-4">
          <button type="submit" className="...">Créer l'article</button>
          <Link href="/admin/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">Annuler</Link>
        </div>
        {formState?.message && <p className="mt-2 text-sm text-red-600">{formState.message}</p>}
      </form>
    </div>
  );
}