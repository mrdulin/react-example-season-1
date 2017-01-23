const {Link} = ReactRouter;

export default class extends React.Component{
    render() {
        return <div style={{border: '1px solid lightBlue', padding: '20px'}}>
            This is page two
            <Link to="/react-router/crumb/level1/level2/level3">level3</Link>
            <div>{this.props.children}</div>
        </div>
    }
}