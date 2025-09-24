// Fichier : src/components/FormattedDate.jsx

"use client";

import { useState, useEffect } from 'react';

export default function FormattedDate({ isoDate }) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // Ce code ne s'exécute que dans le navigateur, APRES l'hydratation.
    // Il n'y a donc plus de conflit.
    const date = new Date(isoDate);
    const dateString = date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    setFormattedDate(dateString);
  }, [isoDate]);

  // Pendant le rendu initial, on peut afficher un placeholder ou rien
  // pour éviter toute incohérence avec le serveur.
  if (!formattedDate) {
    return null; // Ou un spinner, ou un texte de chargement
  }

  return <>{formattedDate}</>;
}