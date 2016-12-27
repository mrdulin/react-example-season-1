export default class extends React.Component{
    render() {

        const items = [];
        for(let i = 0; i < 100; i++) {
            items.push('文本文本文本文本文本' + i);
        }

        return <div id='MobileFixedLayout'>
            <header></header>
            <main>
            <ul>
            {
               items.map((item, idx) => <li key={idx}>item</li>)
            }
            </ul>
            </main>
            <footer>
                <input type="text" placeholder="Footer..."/>
                <button class="submit">提交</button>
            </footer>
        </div>
    }
}