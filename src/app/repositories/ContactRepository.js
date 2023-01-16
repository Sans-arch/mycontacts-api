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

  findByEmail(email) {
    return new Promise(((resolve) => {
      const result = contacts.some((contact) => contact.email === email);
      resolve(result);
    }));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  create({
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const createdContact = {
        id: uuid(),
        name,
        email,
        phone,
        category_id,
      };

      contacts.push(createdContact);
      resolve(createdContact);
    });
  }
}

module.exports = new ContactRepository();
