const Sequelize = require('sequelize');
const conn = new Sequelize (process.env.DATABASE_URL || 'postgres://localhost/universities');

const School = conn.define ('school', {
    
    name : {
        type: Sequelize.STRING,
        validate: {
        // list of validate commands:
        // http://docs.sequelizejs.com/manual/models-definition.html
        }
    },
   
    id : {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    }

})

const Student = conn.define('Student', {

    firstName: {
        type: Sequelize.STRING,
        validate: {}
    },

    lastName: {
        type: Sequelize.STRING,
        validate: {}
    },

    email: {
        type: Sequelize.STRING,
        validate: {}
    },

    gpa: {
        type: Sequelize.STRING,
    },

    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    }

})

Student.belongsTo(School);
School.hasMany(Student);

const syncAndSeed = async() => {
    await conn.sync({force: true});
    const schools = ['UCLA', 'Cal Poly', 'Toilet University'];
    const [ UCLA, CP, TU ] = await Promise.all(schools.map(async item => await School.create({name:item})));
    const students = [{ firstName: 'Smooth', lastName: 'Poopie', gpa: 4.0 }, { firstName: 'Mustang', lastName: 'Sally', gpa: 3.625, schoolId: CP.id }, { firstName: 'Stephanie', lastName: 'Stampher', gpa: 4.0, schoolId: UCLA.id }];
    await Promise.all(students.map(item => Student.create(item)));
}

module.exports = {
    syncAndSeed,
    School,
    Student
}