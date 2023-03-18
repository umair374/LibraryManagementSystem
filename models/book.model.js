module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
         autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      published: {
        type: Sequelize.BOOLEAN,
      },
    });
  
    return Book;
  };
  

  