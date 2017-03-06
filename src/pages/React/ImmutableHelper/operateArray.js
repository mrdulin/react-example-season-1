import update from 'immutability-helper';

export default class extends React.Component{
    constructor() {
        super();
        const todos = [
            {id: 1, body: "eat"},
            {id: 2, body: "drink"},
            {id: 3, body: "sleep"},
            {id: 4, body: "run"}
        ];

        const id = 4;
        
        //删除todos中id=4的元素
        
        //方式一：
        const index = todos.findIndex(t => t.id === id);
        const newTodos = update(todos, {$splice: [[index, 1]]});

        //方式二：
        const newTodosTwo = todos.filter(t => t.id !== id);
        console.log(newTodos, newTodosTwo);

        //个人觉得immutability-helper对比filter的优势是对嵌套的复杂数据结构的处理比较方便


        //假设有如下数据，现在再来进行上述操作，删除todos数组中id=4的元素
        const collection = [1, 2, {todos: [...todos]}];

        //使用immutability-helper，对于嵌套的含有引用类型的数据，它对操作路径上的每一个引用类型的数据都返回了一份新的拷贝
        //这对于使用react-redux的connect state到组件，组件如果需要重新渲染，如果connect的是引用类型的数据，在reducer中操作后，需要返回一份该引用类型新的拷贝
        
        const newCollection = update(collection, 
            {
                2: {
                    todos: {
                        $apply: todos => todos.filter(t => t.id !== id)
                    }
                }
            }
        );

        //使用老方法：三次操作，一是删除todos中的数据并返回新的拷贝，二是返回collection的新的拷贝，三是给collection[2]的新的拷贝
        const todoList = collection[2].todos;
        const idx = todoList.findIndex(t => t.id === id);
        const newTodoList = update(todoList, {$splice: [[index, 1]]});
        const newCollectionTwo = [...collection];
        newCollectionTwo[2] = {
            todos: newTodoList
        };

        console.log(collection, newCollectionTwo, collection === newCollectionTwo, collection[2] === newCollectionTwo[2]);        

        console.log('newCollection', newCollection, newCollection === collection, newCollection[2] === collection[2]);
        
    }
    render() {
        return <div>
            operate array
        </div>
    }
}