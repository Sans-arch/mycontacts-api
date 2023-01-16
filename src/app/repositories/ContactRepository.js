const { v4: uuid } = require('uuid');

let contacts = [
  {
    id: uuid(),
    name: 'Santiago',
    email: 'santiago@mail.com',
    phone: '12312121312',
    category_id: uuid(),
  },
  {
    id: uuid(),
    name: 'Jose',
    email: 'jose@mail.com',
    phone: '121212asaSSAKSaik',
    category_id: uuid(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise(((resolve) => {
      const result = contacts.find((contact) => contact.id === id);
      resolve(result);
    }));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactRepository();
