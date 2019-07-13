const Sequelize = require('sequelize');
const conn = new Sequelize (process.env.DATABASE_URL || 'postgres://localhost/universities');

const School = conn.define ('School', {
    
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
// School.hasMany(Student, { foreignKey: schoolId });

const syncAndSeed = async() => {
    await conn.sync({force: true});
    const schools = ['UCLA', 'Cal Poly', 'Toilet University'];
    await Promise.all(schools.map(item => School.create({name:item})));
    const students = ['Smooth', 'Mustang', 'Stephanie'];
    await Promise.all(students.map(item => Student.create({firstName:item})));
}

//syncAndSeed();

module.exports = {
    syncAndSeed,
    School,
    Student
}