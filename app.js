const express = require('express');
const app = express();
const bodyParser = require("body-parser")

var students = [];  // username, email, grade


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/student', (req, res) => {
    if (!req.query.search){
        res.json(students);
    }
    else {
        res.json(students.filter(student => student.username === req.query.search));
    }
});


app.get('/student/:studentid', (req, res) => 
{
    res.json(students.filter(student => student.studentid == req.params.studentid))
});

app.get('/grades/:studentid', (req, res) => {
    res.json(students.filter(student => student.studentid == req.params.studentid))
});

app.post('/register', (req, res) => { 
    if (req.body.username && req.body.email){
        studentid = students.length+1;
        students.push({username: req.body.username, email: req.body.email, studentid: studentid, grade: ""})
        res.send({message: "Successfully Added user", status: "success"})
    }
    else {
        res.send({message: "Failed to Add user", status: "failed"})
    }
});

function studentExists(id){
    if (students.filter(student => student.studentid == id).length > 0) return true;
    else return false;
    
}
app.post('/grades', (req,res)=> {
    if (req.body.studentid && req.body.grade && studentExists(req.body.studentid)){
        
        const newStudents = students.map(student => {
            if (student.studentid == req.body.studentid){
                return {...student, grade: req.body.grade}
            }
            else { return student }
        });
        console.log(newStudents);
        students = newStudents;
        res.send({message: "Successfully Added grade", status: "success"})
    }
    else {
        res.send({message: "Failed to Add grade", status: "failed"})
    }
    
});

const port = 3000
app.listen(port, () => console.log(`Student App listening at http://localhost:${port}`))