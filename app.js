// require the just installed express app
var express = require('express');
var bodyParser = require('body-parser');

// then we call express
var app = express();

// init port number
const port = process.env.PORT || 3000;

// set up template engine 
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true}));

// render css files
app.use(express.static('public'));

// the task array with initial placeholders for addedd task
var task = ["buy socks", "practise with nodejs"];
// placeholders for removed task
var complete = ['finish jquery'];

// post route for adding new task
app.post('/addtask', (req, res) => {
    var newTask = req.body.newTask;

    // add the new task from the post route into the array
    task.push(newTask);

    // after adding to the array go back to the root route
    res.redirect('/');
});

app.post('/removetask', (req, res) => {
    var completedTask = req.body.check;

    // check for the 'typeof' the different completed task,
    // then remove using the array splice method
    if (typeof completedTask === 'string') {
        complete.push(completedTask);

        // check if the completed task already exist in the tash when checked
        // then remove using the array splice method
        task.splice(task.indexOf(completedTask), 1);
    } else if (typeof completedTask === 'object'){
        for (var i = 0; i < completedTask.lenght; i++) {
            completedTask.push(completedTask[1]);
            task.splice(task.indexOf(completedTask[i]), 1);
        }
    }

    res.redirect('/');
});

// render the ejs and display added task, task(index.ejs) = task(array)
app.get('/', (req, res) => {
    res.render('index', { task: task, complete: complete});
});


app.listen(port, () => {
    console.log('Example app listening on port 3000!');
});

