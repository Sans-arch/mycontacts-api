const { v4: uuid } = require('uuid');

const db = require('../../database');

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
      const result = contacts.find((contact) => contact.email === email);
      resolve(result);
    }));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, category_id]);

    return row;
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (contact.id === id ? updatedContact : contact));

      resolve(updatedContact);
    });
  }
}

module.exports = new ContactRepository();
