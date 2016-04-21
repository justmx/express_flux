var React = require('react');
var ReactDom = require('react-dom');
var groceryItemStore = require('./stores/GroceryItemStore.jsx');
var GroceryItemList= require('./components/GroceryItemList.jsx');
console.log('Hello from JSX!');
//ReactDom.render(<h1 hihi />, app)

 var initial = groceryItemStore.getItems();
 console.log(initial);

function render(){
	ReactDom.render(<GroceryItemList items={initial}/>, app);
}

groceryItemStore.onChange(function(items){
	initial = items;
	render();
})

render();

//document.getElementById('app')