import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Property from './property';

const staticProperties = [
  {
    id: 'title',
    title: 'Title',
    type: 'String'
  },
  {
    id: 'publishedDate',
    title: 'Published Date',
    type: 'Date'
  }
];

export default class Linking extends Component {
  static fragments = {
    schema: {
      _id: 1,
      title: 1,
      properties: 1
    }
  }

  static propTypes = {
    schema: PropTypes.object.isRequired,
    addOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired,
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  }

  render () {
    const properties = [...staticProperties, ...(this.props.schema.properties || [])];
    const {linkingDataElement} = this.props.pageBuilder;
    const schemaLinks = linkingDataElement && linkingDataElement.props && linkingDataElement.props.schemaLinks || {};

    return (
      <div className='linking'>
        {properties.map(this.renderProperty.bind(this, schemaLinks))}
      </div>
    );
  }

  renderProperty (schemaLinks, property) {
    return (
      <Property
        key={property.id}
        property={property}
        addOverlay={this.props.addOverlay}
        closeOverlay={this.props.closeOverlay}
        links={schemaLinks[property.id] || []}
        pageBuilder={this.props.pageBuilder}
        pageBuilderActions={this.props.pageBuilderActions}
      />
    );
  }
}