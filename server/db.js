const Sequelize = require('sequelize');
const conn = new Sequelize (process.env.DATABASE_URL || 'postgres://localhost/universities');

const School = conn.define ('school', {
    
    name : {
        type: Sequelize.STRING,
        allowNull: false
    },

    url : {
        type: Sequelize.STRING,
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
        validate: {
            notEmpty(value){
                if(!value)
                throw new Error('A valid first name must be entered!');
            }
        }
    },

    lastName: {
        type: Sequelize.STRING,
        validate: {
            notEmpty(value){
                if(!value)
                throw new Error('A valid last name must be entered!');
            }
        }
    },

    email: {
        type: Sequelize.STRING,
        validate: {
            notEmpty(value){
                if(!value)
                throw new Error('A valid email address must be entered!');
            }
        }
    },

    gpa: {
        type: Sequelize.STRING,
        validate: {
            isValidGpa(value){
                if(value < 0 || value > 4)
                throw new Error('You and I both know that is not really your gpa... please enter another gpa!');
                if(!value)
                throw new Error('Please enter a gpa!');
            }
        }
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
    const schools = [{name:'UCLA', url:"https://i.etsystatic.com/12595643/r/il/9082b3/966516748/il_794xN.966516748_ffik.jpg"}, { name:'Cal Poly', url: ""}, {name:'Toilet University', url: ""}, {name: 'Not Enrolled', url: ""}];
    const [ UCLA, CP, TU, NE ] = await Promise.all(schools.map(async item => await School.create({name:item.name, url:item.url})));
    const students = [{ firstName: 'Smooth', lastName: 'Poopie', gpa: 4.0, schoolId: NE.id }, { firstName: 'Mustang', lastName: 'Sally', gpa: 3.625, schoolId: CP.id }, { firstName: 'Stephanie', lastName: 'Stampher', gpa: 4.0, schoolId: UCLA.id }];
    await Promise.all(students.map(item => Student.create(item)));
}

module.exports = {
    syncAndSeed,
    School,
    Student
}