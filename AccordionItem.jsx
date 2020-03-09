import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { urlApi } from '../../constants';
import './Accordion.scss';

class AccordionItem extends Component {
  constructor(props) {
    super(props);
    const { comment: { nbComments } } = this.props;
    this.state = {
      opened: false,
      contents: [],
      nbComments,
    };
  }

  // GET all content by company
  handleChange = () => {
    const { comment: { companyId } } = this.props;
    const { opened } = this.state;
    fetch(`${urlApi}/review/validation/content/${companyId}`)
      .then(res => res.json())
      .then((contents) => {
        this.setState({
          contents,
          opened: !opened,
        });
      });
  }

  // PUT add a comment
  admitComment = (event) => {
    const id = event.target.value;
    const config = {
      method: 'PUT',
    };
    const { nbComments } = this.state;

    fetch(`${urlApi}/review/validation/content/${id}`, config)
      .then((res) => {
        if (res.ok) {
          NotificationManager.success('', 'Element ajouté');
          const { comment: { companyId } } = this.props;
          fetch(`${urlApi}/review/validation/content/${companyId}`)
            .then(res => res.json())
            .then((contents) => {
              this.setState({
                contents,
                nbComments: nbComments - 1,
              });
            });
        } else {
          NotificationManager.error('', 'Erreur lors de l\'ajout du commentaire', 3000);
        }
      }).catch(() => {
        NotificationManager.error('', 'Erreur lors de l\'ajout', 3000);
      });
  }

  // DELETE delete comment from database
  deleteComment = (event) => {
    const id = event.target.value;
    const config = {
      method: 'DELETE',
    };
    const { nbComments } = this.state;

    fetch(`${urlApi}/review/validation/content/${id}`, config)
      .then((res) => {
        if (res.ok) {
          NotificationManager.success('', 'Avis supprimé');
          const { comment: { companyId } } = this.props;
          fetch(`${urlApi}/review/validation/content/${companyId}`)
            .then(res => res.json())
            .then((contents) => {
              this.setState({
                contents,
                nbComments: nbComments - 1,
              });
            });
        } else {
          NotificationManager.error('', 'Erreur lors de la suppression d\'un avis', 3000);
        }
      }).catch(() => {
        NotificationManager.error('', 'Erreur lors de la suppression d\'un avis', 3000);
      });
  }

  render() {
    const {
      props: {
        comment: {
          logo,
          name,
          city,
        },
      },
      state: {
        opened,
        contents,
        nbComments,
      },
    } = this;

    return (
      <div className="AccordionItem">
        <div
          {...{
            className: `accordion-item, ${opened && 'accordion-item--opened'}`,
          }
          }
        >
          <div className="accordion-item__line">
            <img src={logo} alt="logo" />
            <div>{name}</div>
            <div>{city}</div>
            <span>{nbComments}</span>
            <span role="button" className="accordion-item__icon" onClick={this.handleChange} onKeyDown={this.handleChange} tabIndex={0} />
          </div>
          <div className="accordion-item__inner">
            <div className="accordion-item__content">
              <div>
                <div className="accordion-item__paragraph">
                  <ul>
                    {contents.map(content => (
                      <div className="card">
                        <li key={content.id}>
                          <p>{`commentaire de ${content.review9}`}</p>
                          <br />
                          {content.review8}
                          {content.review7}
                          <br />
                          <button className="validButton" type="button" value={content.id} onClick={this.admitComment}>Valider</button>
                          <button className="deletebutton" type="button" value={content.id} onClick={this.deleteComment}>Supprimer</button>
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <NotificationContainer />
        </div>
      </div>
    );
  }
}

export default AccordionItem;
