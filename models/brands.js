const db = require('../db/config');

const Brand = {};

Brand.findAll = () => {
  return db.query(`SELECT * FROM brands`);
};

Brand.findById = id => {
  return db.oneOrNone(
    `
    SELECT * FROM brands
    WHERE id = $1
  `,
    [id]
  );
};

Brand.create = brand => {
  return db.one(
    `
    INSERT INTO brands
    (name, location, story, quote, featured)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,
    [brand.name, brand.location, brand.story, brand.quote, brand.featured]
  );
};

Brand.update = (brand, id) => {
  return db.one(
    `
    UPDATE brands SET
      name = $1,
      location = $2,
      story = $3,
      quote = $4,
      featured = $5
    WHERE id = $6
    RETURNING *
  `,
    [brand.name, brand.location, brand.story, brand.quote, brand.featured, id]
  );
};

Brand.destroy = id => {
  return db.none(
    `
    DELETE FROM brands
    WHERE id = $1
  `,
    [id]
  );
};

module.exports = Brand;
