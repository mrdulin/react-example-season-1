import React, {Component} from 'react';

const SC = () => (
	<p>sc</p>
)

class JSXArrayDom extends Component{
	render() {
		//Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `ArrayDom`. See https://fb.me/react-warning-keys for more information.
		const doms = [
			<p>下楼取快递，在A座</p>,
			<p>地狱之轮</p>,
			<p>优化代码</p>
		];

		const arr = [];

		const Coun = <div>2<SC></SC></div>;
		const Coua = <div>1<SC></SC></div>;

		arr.push(Coun, Coua);

		console.log(arr);

		return <div>
			{doms}
			{arr.map(c => c)}
		</div>
	}
}

export default JSXArrayDom;