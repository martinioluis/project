import React from 'react';
import { NavLink } from 'react-router-dom';
import './MenuAdmin.scss';

const logOut = () => {
  localStorage.clear();
};

function MenuAdmin() {
  return (
    <div className="MenuNav">
      <div className="admin">
        <NavLink to="/admin/accueil">Accueil</NavLink>
      </div>
      <div className="admin">
        <NavLink to="/admin/entreprise">Validation des entreprises</NavLink>
      </div>
      <div className="admin">
        <NavLink to="/admin/validation">Validation des commentaires</NavLink>
      </div>
      <div className="admin">
        <NavLink to="/admin/managecompany">Gérer mes entreprises</NavLink>
      </div>
      <div className="btn-deconnexion admin">
        <NavLink to="/">
          <button type="button" onClick={logOut}> Déconnexion </button>
        </NavLink>
      </div>
    </div>
  );
}

export default MenuAdmin;
