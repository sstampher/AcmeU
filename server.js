const express = require('express');
const path = require('path');
const { School } = require('./server/db');
const { Student } = require('./server/db');
const { syncAndSeed } = require('./server/db');

syncAndSeed();

const app = express();

app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, './public')))


app.get('/api/schools', async (req, res, next) => {
  try{
    res.json(await School.findAll());
  }
  catch(err){
    next(err);
  }
});

app.get('/api/students', async (req, res, next) => {
  try{
    res.json(await Student.findAll());
  }
  catch(err){
    next(err);
  }
});

app.post('/api/students', async (req, res, next) => {
  try{
    const newStudent = await Student.create({
      firstName: req.body.studentData.firstName,
      lastName: req.body.studentData.lastName,
      gpa: req.body.studentData.gpa,
      email: req.body.studentData.email
    });
    res.json(newStudent);
  }
  catch(err){
    next(err);
  }
});

app.put('/api/students/:id', async (req, res, next) => {
  try{
    console.log('inside server put request')
    const updatedStudent = await Student.update({ schoolId: req.body.updateInfo.schoolId }, { where: { id: req.params.id } })

    res.json( updatedStudent )
  }
  catch(err){
    next(err);
  }
})

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})
const port = 3001;

app.listen(port, () => `Server running on port ${port}`);
