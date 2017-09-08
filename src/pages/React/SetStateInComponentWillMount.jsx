/**
 * Created by dulin on 17/1/18.
 */
export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: '',
        age: 0
      }
    };

    this._fetchData().then(data => {
      this.setState({user: data});
    })
  }

  componentWillMount() {
    // this._fetchData().then(data => {
    //     this.setState({user: data});
    // })
  }

  _fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({name: 'novaline', age: 23});
      }, 1000)
    });
  }

  render() {
    const {user} = this.state;

    console.count('SetStateInComponentWillMount render')
    return <div>
      <p>用户名：{user.name}</p>
      <p>年龄：{user.age}</p>
    </div>
  }
}
