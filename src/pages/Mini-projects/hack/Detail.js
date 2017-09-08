import React from 'react';
import ajax from 'superagent';
import {IndexLink, Link} from 'react-router';

class Detail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mode: 'commits',
      commits: [],
      pulls: [],
      forks: []
    };
  }

  componentWillMount() {
    this.fetchData('commits');
    this.fetchData('pulls');
    this.fetchData('forks');
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchData(type) {
    const baseUrl = 'https://api.github.com/repos/facebook';
    ajax.get(`${baseUrl}/${this.props.params.repo}/${type}`)
      .end((err, res) => {
        if (!this._isMounted) return;
        if (!err && res) {
          this.setState({[type]: res.body})
        } else {
          console.log('Error fetching ${type}', err);
        }
      });
  }

  renderCommits() {
    return this.state.commits.map((commit, index) => {
      const author = commit.author ? commit.author.login : 'Anonymous';

      return <p key={index}>
        <strong><Link to={`/user/${author}`}>{author}</Link></strong>
        <a href={commit.html_url}>{commit.commit.message}</a>
      </p>;
    });
  }

  renderPulls() {
    return this.state.pulls.map((pull, index) => {
      const user = pull.user ? pull.user.login : 'Anonymous';

      return <p key={index}>
        <strong><Link to={`/user/${user}`}>{user}</Link></strong>
        <a href={pull.html_url}>{pull.body}</a>
      </p>;
    });
  }

  renderForks() {
    return this.state.forks.map((fork, index) => {
      const owner = fork.owner ? fork.owner.login : 'Anonymous';

      return <p key={index}>
        <strong><Link to={`/user/${owner}`}>{owner}</Link></strong>
        <a href={fork.html_url}>{fork.fork.html_url}</a> at {fork.created_at}.
      </p>
    });
  }

  setMode(event) {
    this.setState({mode: event.target.dataset.mode});
  }

  render() {
    let content;
    if (this.state.mode === 'commits') {
      content = this.renderCommits();
    } else if (this.state.mode === 'pulls') {
      content = this.renderPulls();
    } else if (this.state.mode === 'forks') {
      content = this.renderForks();
    }

    return <div>
      <p>
        You are here: <IndexLink to='/mini-projects/hack' activeClassName='active'>Home</IndexLink>
        > {this.props.params.repo}
      </p>
      <ul onClick={this.setMode.bind(this)}>
        <li><a data-mode="commits">commits</a></li>
        <li><a data-mode="forks">forks</a></li>
        <li><a data-mode="pulls">pulls</a></li>
      </ul>

      {content}
    </div>
  }
}

Detail.propTypes = {
  params: React.PropTypes.object
};

export default Detail;
