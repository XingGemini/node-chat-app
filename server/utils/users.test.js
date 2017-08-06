const expect = require('expect');

const {Users} = require('./users');

describe ('Users', () => {
  var users;

  beforeEach (() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Xing',
      room: 'node'
    }, {
      id: '2',
      name: 'Xing2',
      room: 'perl'
    }, {
      id: '3',
      name: 'Xing3',
      room: 'node'
    }];

    console.log(users);
  });

  it ('should add new user', () => {
    var users = new Users();

    var user = {
      id: '123',
      name: 'Xing',
      room: 'Big Bang'
    };

    var resUser = users.addUser (user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it ('should get the user name list for the node room', () => {
     var res = users.getUserList('node');

     expect(res).toEqual(['Xing', 'Xing3']);
  });

  it ('should get the user name list for the perl room', () => {
     var res = users.getUserList('perl');

     expect(res).toEqual(['Xing2']);
  });

  it ('should get the user by id', () => {
     var res = users.getUser(1);

     expect(res).toEqual(users[0]);
  });

  it ('should not get the user by id', () => {
     var res = users.getUser(99);

     expect(res).toNotExist();
  });

  it ('should remove the user by id', () => {
     var res = users.removeUser('1');

     expect(res.id).toBe('1');
     expect(users.users.length).toBe(2);
  });

  it ('should not remove the user by id', () => {
     var res = users.removeUser("00");

     expect(res).toNotExist();
     expect(users.users.length).toBe(3);

  });
});
