import React, { Component } from 'react';
import { connect } from 'react-redux';
import AutoComplete from './AutoComplete';
import * as Action from './actions';

class AutoCompletePage extends Component {
  componentDidMount() {
    const { dispatch, Books } = this.props;
  }

  render() {
    console.count('AutoCompletePage render')
    const { Books } = this.props;
    return <div>
      <AutoComplete onInputChange={this.handleInputChange} dataList={Books}></AutoComplete>
    </div>
  }

  handleInputChange = (text) => {
    console.log(text);
    const { dispatch } = this.props;
    dispatch(Action.fetchAutoCompleteData(text));
  }

}

const mapStateToProps = state => ({ ...state.AutoComplete });
export default connect(mapStateToProps)(AutoCompletePage);
