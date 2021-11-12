import hash from '../../utils/hash';

const { hashPassword } = hash;

export default {
  up: async queryInterface => queryInterface.bulkInsert('Users', [{
    email: 'alexandre34@gmail.com',
    firstName: 'Alexandre',
    lastName: 'Niyigena',
    password: await hashPassword('Freshmeat@123')
  },
  {
    email: 'admin@freshmeat.biz.rw',
    password: await hashPassword('Freshmeat@123')
  }
], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};