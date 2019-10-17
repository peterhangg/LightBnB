const properties = require('./json/properties.json');
const users = require('./json/users.json');
const db = require('./db/index.js');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  // console.log('This is the email entered:',email);
  const queryString = `SELECT * FROM users WHERE email = $1;`
  return db.query(queryString,[email])
  .then(res => {
    if(res) {
      console.log(res.rows);
      return res.rows[0];
    } else {
      return null;
    }
  }).catch(err => console.error('query error', err.stack));
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `SELECT * FROM users WHERE id = $1;`
  return db.query(queryString,[id])
    .then(res => {
      if(res) {
        console.log(id);
        return res.rows[0];
      } else {
        return null;
      }
    }).catch(err => console.error('query error', err.stack));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString =`
    INSERT INTO users(name, email, password)
    VALUES($1, $2, $3)
    RETURNING *;`;

  return db.query(queryString, [user.name, user.email, user.password])
    .then(res => {
      res.rows
      console.log(user);
    })
    .catch(err => console.error('query error', err.stack));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
    SELECT properties.*, reservations.*, avg(rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id 
    WHERE reservations.guest_id = $1
    AND reservations.end_date < now()::date
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;
  `;
  return db.query(queryString, [guest_id, limit])
    .then(res => {
      console.log(res.rows)
      return res.rows;
    })
    .catch(err => console.error('query error', err.stack));
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id = property_id
    `;

  let parmasCheck = false;
  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
    parmasCheck = true;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `${parmasCheck ? 'AND' : 'WHERE'} owner_id = $${queryParams.length}`;
    parmasCheck = true;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += `${parmasCheck ? 'AND' : 'WHERE'}  cost_per_night >= $${queryParams.length}`;
    parmasCheck = true;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `${parmasCheck ? 'AND' : 'WHERE'}  cost_per_night <= $${queryParams.length}`;
    parmasCheck = true;
  }

  if(options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryParams.push(limit);
    queryString += `
    GROUP BY properties.id
    HAVING AVG(property_reviews.rating) >= $${queryParams.length};
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};`
  } else {
    // 4
    queryParams.push(limit);
    queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  }

   // 5
  console.log(queryString, queryParams);

   // 6
  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryString =`
    INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province,
    post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;`;
  
  const queryVar = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night,
    property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms,
    property.number_of_bathrooms];

  return db.query(queryString, queryVar)
    .then(res => {
      console.log(property)
      return res.rows})
    .catch(err => console.error('query error', err.stack));
}
exports.addProperty = addProperty;
