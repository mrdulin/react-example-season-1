import React from 'react';
import {Link} from 'react-router';

export class CrumbOne extends React.Component {
  render() {
    return <div style={{border: '1px solid red', padding: '20px'}}>
      This is page one
      <Link to="/react-router-demos/crumb/level1/level2">level2</Link>
      <div>{this.props.children}</div>
    </div>
  }
}
