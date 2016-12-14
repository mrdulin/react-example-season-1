import {IndexLink, Link} from 'react-router';

class List extends React.Component {
    render() {
        return <div>
            <p>
            You are here: <IndexLink to='/mini-projects/hack' activeClassName='active'>Home</IndexLink>
            </p>
            <p>Please choose a repository from the list below</p>
            <ul>
                <li><Link to="/mini-projects/hack/detail/react">React</Link></li>
                <li><Link to="/mini-projects/hack/detail/react-native">React Native</Link></li>
                <li><Link to="/mini-projects/hack/detail/jest">Jest</Link></li>
            </ul>
        </div>
    }
}

export default List;
