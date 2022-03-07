
console.log('aaaa =>>>>>>>>>> bbbb');
db.auth('root', '1234');

db = db.getSiblingDB('admin');

// db.createUser({
//   user: 'dev',
//   pwd: '123',
//   roles: [
//     {
//       role: 'dbOwner',
//       db: 'queue1'
//     },
//   ],
// });

db.createUser({
  user: 'queue',
  pwd: '123',
  roles: [
    {
      role: 'dbOwner',
      db: 'queue'
    },
  ],
});

