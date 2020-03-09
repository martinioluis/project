import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { urlApi } from '../../constants';
import './UpdateOrDelete.scss';


class UpdateOrDelete extends Component {
  deleteCompany = () => {
    const { company: { id }, UpdateCompany } = this.props;
    const config = {
      method: 'DELETE',
    };

    fetch(`${urlApi}/company/${id}`, config)
      .then((res) => {
        if (res.ok) {
          NotificationManager.success('', 'Element supprimé');
          UpdateCompany();
        } else {
          NotificationManager.error('', 'Erreur lors de la suppression d\'une entreprise', 3000);
        }
      }).catch(() => {
        NotificationManager.error('', 'Erreur lors de la suppression d\'une entreprise', 3000);
      });
  }

  addCompany = () => {
    const config = {
      method: 'PUT',
    };

    const { company: { id }, UpdateCompany } = this.props;
    fetch(`${urlApi}/company/validation/${id}`, config)
      .then((res) => {
        if (res.ok) {
          NotificationManager.success('', 'Element ajouté');
          UpdateCompany();
        } else {
          NotificationManager.error('', 'Erreur lors de l\'ajout de l\'entreprise', 3000);
        }
      }).catch(() => {
        NotificationManager.error('', 'Erreur lors de l\'ajout', 3000);
      });
  }

  render() {
    const { company: { logo, name, city } } = this.props;
    return (
      <div className="UpdateOrDelete">
        <button className="bouton1" type="button" onClick={this.deleteCompany}>Supprimer</button>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="name">
          {name}
        </div>
        <div className="city">
          {city}
        </div>
        <button className="bouton2" type="button" onClick={this.addCompany}>Valider</button>
        <NotificationContainer />
      </div>
    );
  }
}

UpdateOrDelete.defaultProps = {
  company: {},
};

export default UpdateOrDelete;
