"use client";

import { deletePost } from "../../../actions/postActions";
import { useTransition } from "react";

const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;

export default function DeleteButton({ postId }) {
  let [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.")) {
      startTransition(() => deletePost(postId));
    }
  };

  return (
    <button onClick={handleDelete} disabled={isPending} className="text-red-600 hover:text-red-900 disabled:opacity-50">
      <DeleteIcon />
    </button>
  );
}