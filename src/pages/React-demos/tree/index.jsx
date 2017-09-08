import React from 'react';
import './style.scss';

export default class extends React.Component {
  state = {
    root: [
      {
        name: 'root',
        children: [
          {
            name: 'a',
            children: [
              {
                name: 'a1',
                children: []
              },
              {
                name: 'a2',
                children: []
              }
            ]
          },
          {
            name: 'b',
            children: [
              {
                name: 'b1',
                children: []
              },
              {
                name: 'b2',
                children: []
              }
            ]
          }
        ]
      }
    ]
  }

  renderNodes(nodes) {
    return (
      <ul>
        {
          nodes.map((node, idx) => {
            const children = node.children || [];
            return <li key={idx}>
              {node.name}
              {this.renderNodes(children)}
            </li>
          })
        }
      </ul>
    )
  }

  render() {
    return (
      <div id='tree'>
        tree
        {this.renderNodes(this.state.root)}
      </div>
    )
  }
}
