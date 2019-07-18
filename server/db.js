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
    const schools = [{name:'UCLA', url:"https://i.etsystatic.com/12595643/r/il/9082b3/966516748/il_794xN.966516748_ffik.jpg"}, { name:'Cal Poly', url: "https://www.zgf.com/wp-content/uploads/2013/08/L40302.00_CalPolyBaker-1500x700.jpg"}, {name:'Cal State Northridge', url: "https://hereinvannuys.files.wordpress.com/2011/02/5415080954_4afa336795_o.jpg"}, {name: 'Not Enrolled', url: "https://jooinn.com/images/sad-smiley-face-2.jpg"}, {name:'Fullstack Academy', url:"https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F63738782%2F236547668415%2F1%2Foriginal.20190221-183436?h=230&w=460&auto=compress&rect=0%2C203%2C3456%2C1728&s=cc21017e40f32ea0f262651f59f201ba"}];
    const [ UCLA, CP, CSUN, NE, FA ] = await Promise.all(schools.map(async item => await School.create({name:item.name, url:item.url})));
    const students = [{ firstName: 'Smooth', lastName: 'Poopie', gpa: 2.5, schoolId: CSUN.id }, { firstName: 'Mustang', lastName: 'Sally', gpa: 3.625, schoolId: CP.id }, { firstName: 'Stephanie', lastName: 'Stampher', gpa: 3.8, schoolId: UCLA.id }, { firstName: 'Shashank', lastName: 'Lahiry', gpa: 4.0, schoolId: CSUN.id }, { firstName: 'Prof', lastName: 'Katz', gpa: 4.0, schoolId: FA.id }];
    await Promise.all(students.map(item => Student.create(item)));
}

module.exports = {
    syncAndSeed,
    School,
    Student
}