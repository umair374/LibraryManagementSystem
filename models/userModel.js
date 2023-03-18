const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
 'umair',
 'root',
 '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

const user = sequelize.define("users", {
   name: {
     type: DataTypes.STRING,
     allowNull: false
   },
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },    
   registered_books: {
     type: DataTypes.INTEGER,
   },
   fine: {
     type: DataTypes.INTEGER,
   }
});



sequelize.sync().then(() => {
   console.log('user table created successfully!');

   user.create({
       name: "Ali",
       id: 123,
       registered_books: 3,
       fine: 500
   }).then(res => {
       console.log(res)
   }).catch((error) => {
       console.error('Failed to create a new record : ', error);
   });

}).catch((error) => {
   console.error('Unable to create table : ', error);
});

module.exports = user;
