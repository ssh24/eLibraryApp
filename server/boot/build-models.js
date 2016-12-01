/* don't use this file without admin privileges */

// 'use strict';
// var async = require('async');
//
// module.exports = function(app) {
//   var datasource = app.dataSources.DS;
//
//   async.parallel({
//     clients: async.apply(createClients),
//   }, function(err, results) {
//     if (err) throw err;
//     createBooks(results.clients, function(err) {
//       console.log('Models created ... ');
//     });
//   });
//
//   //create clients
//   function createClients(cb) {
//     datasource.automigrate('Client', function(err) {
//       if (err) return cb(err);
//       var Client = app.models.Client;
//       Client.create([{
//         fname: 'Foo',
//         lname: 'Bar',
//         age: 19,
//         phoneNumber: '4164567890',
//         email: 'foo@bar.com',
//         password: 'foobar',
//       }, {
//         fname: 'John',
//         lname: 'Doe',
//         age: 27,
//         phoneNumber: '6475567699',
//         email: 'john@doe.com',
//         password: 'johndoe',
//       }, {
//         fname: 'Jane',
//         lname: 'Doe',
//         age: 14,
//         phoneNumber: '6474567679',
//         email: 'jane@doe.com',
//         password: 'janedoe',
//       }, {
//         fname: 'Tom',
//         lname: 'Hunt',
//         age: 33,
//         phoneNumber: '6475167677',
//         email: 'tom@hunt.com',
//         password: 'tomhunt',
//       }, {
//         fname: 'Marven',
//         lname: 'Jones',
//         age: 23,
//         phoneNumber: '6475589699',
//         email: 'marven@jones.com',
//         password: 'marvenjones',
//       }], cb);
//     });
//   }
//
//   //create books
//   function createBooks(clients, cb) {
//     datasource.automigrate('Book', function(err) {
//       if (err) return cb(err);
//       var Book = app.models.Book;
//       var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
//       Book.create([{
//         bName: 'Don Quixote',
//         bAuthor: 'Miguel de Cervantes',
//         bYear: 1612,
//         bStatus: 'available',
//       }, {
//         bName: 'A Tale of Two Cities',
//         bAuthor: 'Charles Dickens',
//         bYear: 1859,
//         bStatus: 'unavailable',
//         dateBorrowed: Date.now() - (DAY_IN_MILLISECONDS * 14),
//         dueDate: Date.now() + 60000,
//         daysRemaining: ((Date.now() + (60000)) -
//         new Date()) / DAY_IN_MILLISECONDS,
//         clientId: clients[0].id, //foobar,
//         renewalsAvailable: 2,
//       }, {
//         bName: 'O Alquimista',
//         bAuthor: 'Paulo Coelho',
//         bYear: 1988,
//         bStatus: 'available',
//       }, {
//         bName: 'Le Petit Prince',
//         bAuthor: 'Antoine de Saint-Exupéry',
//         bYear: 1943,
//         bStatus: 'unavailable',
//         dateBorrowed: Date.now(),
//         dueDate: Date.now() + (DAY_IN_MILLISECONDS * 14),
//         daysRemaining: ((Date.now() + (DAY_IN_MILLISECONDS * 14)) -
//         new Date()) / DAY_IN_MILLISECONDS,
//         clientId: clients[2].id, //jandoe
//         renewalsAvailable: 2,
//       }, {
//         bName: 'Harry Potter and the Philosopher Stone',
//         bAuthor: 'J.K. Rowling',
//         bYear: 1997,
//         bStatus: 'unavailable',
//         dateBorrowed: Date.now() - (DAY_IN_MILLISECONDS * 4),
//         dueDate: Date.now() + (DAY_IN_MILLISECONDS * 10),
//         daysRemaining: ((Date.now() + (DAY_IN_MILLISECONDS * 10)) -
//         new Date()) / DAY_IN_MILLISECONDS,
//         clientId: clients[1].id, //johndoe
//         renewalsAvailable: 2,
//       }, {
//         bName: 'The Hobbit',
//         bAuthor: 'J. R. R. Tolkien',
//         bYear: 1937,
//         bStatus: 'available',
//       }, {
//         bName: 'And Then There Were None',
//         bAuthor: 'Agatha Christie',
//         bYear: 1939,
//         bStatus: 'available',
//       }, {
//         bName: 'Dream of the Red Chamber',
//         bAuthor: 'Cao Xueqin',
//         bYear: 1754,
//         bStatus: 'unavailable',
//         dateBorrowed: Date.now() - (DAY_IN_MILLISECONDS * 2),
//         dueDate: Date.now() + (DAY_IN_MILLISECONDS * 12),
//         daysRemaining: ((Date.now() + (DAY_IN_MILLISECONDS * 12)) -
//         new Date()) / DAY_IN_MILLISECONDS,
//         clientId: clients[0].id, //foobar
//         renewalsAvailable: 2,
//       }], cb);
//     });
//   }
// };
