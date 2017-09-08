import React from 'react';

export default class extends React.Component {
  componentDidMount() {
    const {getContentElement, getContentInstance} = this.props;
    getContentElement && getContentElement(this.el);
    getContentInstance && getContentInstance(this);
  }

  get el() {
    return this._el;
  }

  render() {
    return (
      <div ref={ref => this._el = ref}>content component</div>
    )
  }
}
