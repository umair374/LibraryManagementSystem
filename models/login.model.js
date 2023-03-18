module.exports = (sequelize, Sequelize) =>
 {
    const Login = sequelize.define("login", 
    {
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
          autoIncrement: true
       },    
      Password: {
        type: Sequelize.STRING,
        },
      });
  

    return Login;
  };

