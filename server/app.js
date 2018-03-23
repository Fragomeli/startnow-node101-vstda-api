const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// add your code here

// This is our mock data for testing. It is an ARRAY.
let todoItems = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];
//===================================================>
//  THIS FIRST STEP ALLOWS ADDING A ROUTE (FORWARD SLASH) 
//   TO THE END OF LOCAL HOST 8484 TO RETURN STATUS 'OK"
//===================================================>

app.get('/', (req, res) => {
    let data = {
        status: "OK"
    };

    res.json(data);
});
//====================================================================>
//  THIS GET REQUEST IN THE HEADER IS DONE BY ADDING /api/TodoItems 
//  AFTER localhost:8484
//  IT WILL RETURN ALL OF THE ELEMENTS IN THE ARRAY named TodoItems.
//=====================================================================>
app.get('/api/TodoItems', (req, res) => {
    res.json(todoItems);
});
// AFTER THAT, WE WANT TO ADD AN INTEGER AFTER A FORWARD SLASH TO 
// localhost:8484/api/TodoItems/1 (or 2 or 3 since there are only 3 element objects
// in the array. In each object there are 4 properites) IF a user enters a value that is 
// contained in the length of the array, return that object. IF user calls for a value 
// that is NOT in the array, return a 404 status and a string saying "item not found"
//
// THERE ARE DIFFERENT WAYS TO DO THIS: HERE'S THE FIRST;
//======================================================================>
//       THIS IS AN IMPERATIVE WAY TO WRITE IT
//======================================================================>
// app.get('/api/TodoItems/:number', (req, res) => {
//     console.log("request params", req.params);

//     var index = parseInt(req.params.number, 10);

//     toDoItems.forEach(data => {
//       if (err ){
//         throw err
//        } else if index == data.todoItems
//        for i<=data.length 
//        for (let i=0; i<todoItems.length; i++) {
//          let todo = todoItems[i];
//        if (todo.todoItemId === index) {
//             res.json(todo);
//             return;
//         }
//     }
//     res.status(404).send("item not found.");
// });
//======================================================================>
//     THIS IS MORE ELEGANTLY WRITTEN IN ES6          
//======================================================================>

app.get('/api/TodoItems/:number', (req, res) => {
    let id = parseInt(req.params.number, 10);

    let foundTodo = todoItems.find(todo => todo.todoItemId === id);
                                        // todo is an object that holds the property of todoItemId//
    if (foundTodo) {
        res.json(foundTodo);
    }
    else {
        res.status(404).send("No item found!");
    }
});
//==================================================================>
//    NOW, TO ADD AN ITEM TO A DATASET. IF THERE IS ALREADY AN ITEM 
//    WITH A MATCHING todoItemID, OVERWRITE THE EXISTING ITEM.
//   
//    USE POST { object }
//===================================================================>
// app.post('/api/TodoItems/',(req, res) => {
//     let newItem = newItem(req.body);
//     newitem.save()
//     .then (item =>{
//         res.json('new item added to list');
//     })
//     .catch (err => {
//         res.status(400).send('unable to add new item. Sorry');
//     }
//     res.status(400).send('duplicate item already exists'));
// });
//   HOLY CATS! DON'T USE THE ABOVE BECAUSE IT USES MONGOOSE DB AND 
//   YOU ARE NOWHERE NEAR THAT YET!!! Live and Learn, eh?
//======================================================================>

// app.post('/api/TodoItems/', (req, res) => {
//     let newItem = req.body.todoItemId;
//     //console.log ("one new item", newItem);
//     //console.log ("new item", req.body);
//     // check todo.todoItemId and check to see if it exists in the todos array (use Array.find())
//     // if it exists, then replace the contents of that array element with todo
//     // else push todo onto todo array
//     // after you're done return the new item
//=======================
//   THE BELOW CODE WORKED BUT WAS OVERWRITTEN
//=======================
//     let AddedItem = todoItems.find(todo => todo.todoItemId === newItem);
//     // if (newItem.)
//     //console.log (AddedItem);
//
//     if (AddedItem === undefined) {
//         todoItems.push(req.body);
//         res.status(200).send("You've added a new item to the array");
//     }
//     else {
//         let overwriteIndex = todoItems.findIndex(todo => todo === AddedItem);
//         todoItems[overwriteIndex] = req.body;
//         res.status(200).send("You overwritten an item at " + overwriteIndex);
//     }
// });
//=====THE BELOW IS TIGHTER=====

app.post('/api/TodoItems/', (req, res) => {
    let newTodo = req.body; //req.body is the payload in a POST request//
    let id = newTodo.todoItemId; // 

    // let existingTodo = todoItems.find(todo => todo.todoItemId === id);
    //
    // if (existingTodo) {
    //     // We already have this todo with the same id!
    //     res.status(400).send("Item is already in the collection (array)");
    // }
    // else {
    //     console.log("new todo is ", newTodo);
    //     todoItems.push(newTodo);
    //     res.status(201).send("You've added a new item to the array");
    // }

    console.log("new todo is ", newTodo);
    todoItems.push(newTodo);
    res.status(201).json(newTodo);    
});



//=================================================================================>
//    TO DELETE AN ITEM FROM THE LIST AND RETURN A MESSAGE
//=================================================================================>
//let item2Delete = req.params.todoItemId;

// app.delete('/api/TodoItems/:number', (req, res) => {
//     let id = parseInt(req.params.number, 10);

//     let item2Delete = todoItems.find(todo => todo.todoItemId === id);

//     if (item2Delete === req.params) {
//         todoItems.splice(0,1);
//         res.status(204).send("Item deleted successfully");
//     }
//     else {
//         let deletedIndex = todoItems.findIndex(todo => todo === item2Delete);
//         todoItems[deletedIndex] = req.body;
//         res.status(204).send("You deleted an item at " + deletedIndex);
//     }

//     res.status(204).send("item deleted.");
// });

app.delete('/api/TodoItems/:number', (req, res) => {
    let id = parseInt(req.params.number, 10); // req.params is referring to the route path /:numbers. Since "number"
                                              // is a word in a string use parseInt() to allow use to type an integer
                                               // after the route forward slash- ex. '/api/TodoItems/3
                                              // the ,10) is base 10 which indicates what type of numbers the computer
                                              // will understand.

    let item2Delete = todoItems.find(todo => todo.todoItemId === id);
        // create a new variable (in this case, we named it item2delete and define it. todoItems is the original array
        // and  array.find() is the method. In this case the object todo contains
        // a function ( => ) which is requesting a FOR  loop to iterate through the array and stop when it is 
        // equal to the variable ID
    if (item2Delete) {
        let index = todoItems.indexOf(item2Delete);
        console.log("Found index", index);
                                        // the .indexOf() method returns the position of the first occurance of a 
                                        // specified value in a string. This method returns -1 if the value to 
                                        // search for never occurs. 

        if (index !== -1) {              // if the index is never equal to  -1 (meaning it alwasy has an index to refer to)
            todoItems.splice(index, 1);  // then splice the array and put the 
            res.status(200).json(item2Delete);
        }
    }
    else {
        res.status(404).send("Item cannot be found to be deleted!");
    }
});

module.exports = app
