//Only executed on the server
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

Meteor.startup(() => {
  // code to run on server at startup
  //Great place to generate data

  //Check to see if data exists in the collection
  const numberOfRecord = Employees.find({}).count();

  console.log(numberOfRecord);
  if(!numberOfRecord) {
    //Generate some fake data
    _.times(5000, () => {
      //const name = helpers.createCard().name;
      //const email = helpers.createCard().email;
      //const phone = helpers.createCard().phone;
      const { name, email, phone } = helpers.createCard();

      // {
      //   name: name,
      //   email: email,
      //   phone: phone
      // }

      // equivallent in ES6 when property name is same is value
      // {name, email, phone}

      Employees.insert({
        name, email, phone,
        avatar: image.avatar()
      });
      
    });
  }

  Meteor.publish('employees', function(per_page) {
    return Employees.find({}, {limit: per_page});
  });
});
