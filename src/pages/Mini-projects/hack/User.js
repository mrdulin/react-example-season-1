import ajax from 'superagent';
import {IndexLink, Link} from 'react-router';

class User extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            events: []
        };
    }

    componentWillMount() {
        let username = this.props.params.username;
        this.isMounted = true;
        this.fetch(username);
    }

    componentWillUnmount() {
        this.isMounted = false;
    }

    fetch(username) {
        var url = `https://api.github.com/users/${username}/events`;
        ajax.get(url)
        .end((err, res) => {
            if(!this.isMounted) return;
            if(!err && res) {
                this.setState({events: res.body});
            } else {
                console.log('Error fetching user data', err);
            }
        });
    }

    render() {
        return (
            <div>
                <p>
                You are here: <IndexLink to='/mini-projects/hack' activeClassName='active'>Home</IndexLink>
                > {this.props.params.repo}
                </p>
                <ul>
                    {this.state.events.map((event, index) => {
                        const eventType = event.type;
                        const repoName = event.repo.name;
                        const creationDate = event.created_at;
                        return (<li key={index}>
                            <strong>{repoName}</strong>: {eventType} at {creationDate}.
                        </li>);
                    })}
                </ul>
            </div>
        );
    }
}

User.propTypes = {
    params: React.PropTypes.object
};

export default User;
