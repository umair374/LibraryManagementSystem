module.exports = (sequelize, Sequelize) =>
 {
 const user = sequelize.define("users",
  {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        }, 
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },    
        registered_books: {
          type: Sequelize.INTEGER,
        },
        fine: {
          type: Sequelize.INTEGER,
        }
     });   

    user.belongsTo(sequelize.models.login, { foreignKey: 'id' });
    return user;
  };

