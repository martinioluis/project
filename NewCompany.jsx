import React, { Component } from 'react';
import { urlApi } from '../../constants';
import UpdateOrDelete from './UpdateOrDelete';
import MenuAdmin from './MenuAdmin';
import './NewCompany.scss';

class NewCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
    };
  }

  componentDidMount() {
    fetch(`${urlApi}/company/admin/companies`)
      .then(res => res.json())
      .then((companies) => {
        this.setState({ companies });
      });
  }

  UpdateCompany = () => {
    fetch(`${urlApi}/company/admin/companies`)
      .then(res => res.json())
      .then((companies) => {
        this.setState({ companies });
      });
  }

  render() {
    const { companies } = this.state;
    return (
      <div className="NewCompany">
        <MenuAdmin />
        <div className="companies">
          { companies.map(company => (
            <UpdateOrDelete
              company={company}
              UpdateCompany={this.UpdateCompany}
              key={company.id}
            />
          )) }
        </div>
      </div>
    );
  }
}

export default NewCompany;
