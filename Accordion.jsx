import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AccordionItem from './AccordionItem';
import { asyncFetchCommentsUnvalidate } from '../../actions/accordion';
import './Accordion.scss';

class Accordion extends Component {
  componentDidMount() {
    const { asyncFetchCommentsUnvalidate } = this.props;
    asyncFetchCommentsUnvalidate();
  }

  render() {
    const { comments } = this.props;
    return (
      <div className="Accordion">
        <div className="wrapper">
          <ul className="accordion-list">
            <li className="accordion-list__item">
              { comments.map(comment => <AccordionItem comment={comment} key={comment.id} />) }
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
const mstp = state => ({
  comments: state.accordion.list,
  loading: state.accordion.loading,
  error: state.accordion.error,
});

const mdtp = dispatch => bindActionCreators({ asyncFetchCommentsUnvalidate }, dispatch);

export default connect(mstp, mdtp)(Accordion);
