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

const inputStyle = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2";

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
          <input type="text" name="title" id="title" required className={inputStyle} placeholder="Un titre accrocheur pour votre article" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description courte (pour l'aperçu)</label>
          <textarea name="description" id="description" rows={3} required className={inputStyle} placeholder="Un résumé concis de 1-2 phrases"></textarea>
        </div>
        <div>
          <label htmlFor="heroImage" className="block text-sm font-medium text-gray-700">Image principale</label>
          <input type="file" name="heroImage" id="heroImage" required accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
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