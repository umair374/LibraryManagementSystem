const { sequelize } = require('./models');
const Book_Author = require('./models/Book_Author.model')(sequelize, sequelize.Sequelize);

describe('Book_Author', () => {
  beforeEach(async () => {
    // Reset the database before each test
    await sequelize.sync({ force: true });
  });

  it('should create a Book_Author instance', async () => {
    const book_author = await Book_Author.create({
      Book_id: 1,
      Author_Name: 'J.R.R. Tolkien',
    });
    expect(book_author).toBeDefined();
    expect(book_author.Book_id).toBe(1);
    expect(book_author.Author_Name).toBe('J.R.R. Tolkien');
  });

  it('should throw a validation error if Book_id is not provided', async () => {
    await expect(Book_Author.create({
      Author_Name: 'J.K. Rowling',
    })).rejects.toThrow('Book_Author.Book_id cannot be null');
  });

  it('should throw a validation error if Author_Name is not provided', async () => {
    await expect(Book_Author.create({
      Book_id: 1,
    })).rejects.toThrow('Book_Author.Author_Name cannot be null');
  });
});
