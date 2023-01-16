const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Santiago',
    email: 'santiago@mail.com',
    phone: '12312121312',
    category_id: uuid(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactRepository();
