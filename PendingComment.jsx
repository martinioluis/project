import React from 'react';
import MenuAdmin from './MenuAdmin';
import Accordion from './Accordion';
import './PendingComment.scss';

function PendingComment() {
  return (
    <div className="PendingComment">
      <MenuAdmin />
      <div className="accordion">
        <Accordion />
      </div>
    </div>
  );
}

export default PendingComment;
