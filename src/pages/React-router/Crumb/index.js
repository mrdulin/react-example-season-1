/**
 * Created by dulin on 17/1/23.
 */
const {Link} = ReactRouter;

class Crumb extends React.Component{
    render() {
        const {children, routes, route, router} = this.props;

        console.log(this.props);

        const routeLen = routes.length;
        const crumbs = [], crumbNames = [];
        let baseIndex, baseRoute = [], baseRouteString;


        for(var i = 0; i < routeLen; i++) {
            if(i !== 0) {
                baseRoute.push(routes[i].path);
            }
            if(routes[i].path === route.path) {
                baseIndex = i + 1;
                break;
            }
        }

        for(; baseIndex < routeLen; baseIndex ++) {
            crumbs.push(routes[baseIndex].path);
            crumbNames.push(routes[baseIndex].name)

        }

        baseRouteString = '/' + baseRoute.join('/');


        return <div>
            <Link to="/react-router/crumb/level1">level1</Link>
            <div>
                {
                    crumbs.map((crumb, index, crumbsSelf) => {
                        let crumbPath = '';

                        for(var i = 0; i < index; i++) {
                            crumbPath += '/' + crumbsSelf[i];
                        }
                        crumbPath += '/' + crumb;

                        const path = `${baseRouteString}${crumbPath}`;

                        return <span key={index}>
                            <span>{index === 0 ? '' : ' -> '}</span>
                            <a onClick={() => router.replace(path)}>{crumbNames[index]}</a>
                        </span>
                    })
                }
            </div>
            <div style={{border: '1px solid #ddd', padding: '20px'}}>
                {children}
            </div>
        </div>
    }

}

export default ReactRouter.withRouter(Crumb);

