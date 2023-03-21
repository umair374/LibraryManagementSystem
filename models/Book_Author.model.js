module.exports = (sequelize, Sequelize) => {
  const Book_Author = sequelize.define("Book_Author", {
    Book_id: {
      type: Sequelize.INTEGER,
      primaryKey:true,
    },
    Author_Name: {
      type: Sequelize.STRING,
    },
    });

  return Book_Author;
};
