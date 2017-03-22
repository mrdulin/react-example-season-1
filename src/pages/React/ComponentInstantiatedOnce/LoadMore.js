export default class extends React.Component {
    componentDidMount() {
    }

    get el() {
        return this._el;
    }

    getContentElement(el) {
        console.log('getContentElement', el);
    }

    getContentInstance(instance) {
        console.log('getContentInstance', instance, instance.el);
    }

    render() {
        const {element, children} = this.props;
        console.log('例2 LoadMore element', element);
        console.log('例3 LoadMore children', children);

        /**
         * Uncaught Error: React.Children.only expected to receive a single React element child.
         * 这是例2报的错误，不用管
         */
        const child = React.Children.only(children);

        return (
            <div ref={ref => this._el = ref}>
                <p>loadmore component</p> 
                {React.cloneElement(child, {
                    getContentElement: this.getContentElement,
                    getContentInstance: this.getContentInstance
                })}
            </div>
        )
    }
}