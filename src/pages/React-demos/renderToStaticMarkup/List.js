import React from 'react';

class List extends React.Component {
  render() {
    const {items} = this.props;

    return (
      <ul>
        {
          items.map((book, idx) => {
            return <li data-x="1" data-y="2" key={idx}>{book}</li>
          })
        }
      </ul>
    )
  }
}
export default List;
