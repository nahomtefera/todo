import { database } from '../firebase';

// // User API

// // Users

//   // Create User
//   export const doCreateUser = (id, name, email) =>
//     database.ref(`users/${id}`).set({
//       name,
//       email,
//     });

//   // Get all users
//   export const onceGetUsers = () =>
//     database.ref('users').once('value');

// // Events

//   // Create Events
//   export const doCreateEvent = (id, uid, title, location, date, time, description, imageURL, members) =>
//   database.ref(`events/${id}`).set({
//     id,
//     uid,
//     title,
//     location,
//     date,
//     time,
//     description,
//     imageURL,
//     members: members
//   });

//   // Get all Events
//   export const onceGetEvents = () =>
//   database.ref('events').once('value');

//   // All child events
//   export const getChildEvents = () =>
//   database.ref().child("events");
