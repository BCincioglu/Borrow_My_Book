import User from './user';
import Borrow from './borrow';
import Book from './book';

User.hasMany(Borrow, { foreignKey: 'userId' });
Borrow.belongsTo(User, { foreignKey: 'userId' });

Book.hasMany(Borrow, { foreignKey: 'bookId' });
Borrow.belongsTo(Book, { foreignKey: 'bookId' });

export { User, Borrow, Book };
