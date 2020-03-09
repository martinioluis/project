import React from 'react';
import MenuAdmin from './MenuAdmin';
import './AdminAccueil.scss';

function AdminAccueil() {
  return (
    <div className="AdminAccueil">
      <h1>Bienvenue dans votre espace administrateur</h1>
      <MenuAdmin />
    </div>
  );
}

export default AdminAccueil;
