import React, {Component, PropTypes} from 'react';

class Footer extends Component{

    static defaultProps = {
        actionfilterMap: new Map([
            ['SHOW_ALL', 'All'],
            ['SHOW_ACTIVE', 'Active'],
            ['SHOW_COMPLETE', 'Completed']
        ])
    }

    render() {
        const {actionfilterMap, filter, todoCount} = this.props;
        const filterItems = [...actionfilterMap.keys()].map(filterKey => {
            const filterName = actionfilterMap.get(filterKey);
            return <li key={filterName}>
                <a href="javascript:void 0" className={`${filterName === filter ? 'selected' : ''}`} onClick={e => this.handleFilterClick(filterKey, e)}>{filterName}</a>
            </li>
        });
        return (
            <footer id='footer' style={{display: todoCount > 0 ? 'block' : 'none'}}>
                <span id='todo-count'></span>
                <ul id='filters'>{filterItems}</ul>
            </footer>
        );
    }

    handleFilterClick(filterKey, e) {
        const {onFilterChange, filter} = this.props;
        e.preventDefault();
        if(filterKey === filter) return;
        onFilterChange && onFilterChange(filterKey);
    }
}

Footer.PropTypes = {
    filter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETE',
        'SHOW_ACTIVE'
    ]).isRequired,

    onFilterChange: PropTypes.func.isRequired
};

export default Footer;
