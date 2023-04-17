const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require("../models");
const User = db.users;
const Login = db.logins;
const Op = db.Sequelize.Op;

exports.login = (req, res) => {
  const username = req.body.id;
  const password = req.body.password;

  Login.findOne({ where: { id: username } })
    .then(user => {
      if (!user) {
        return res.status(401).send('Invalid credentials');
      }
      if (!user.verifyPassword(password)) {
        return res.status(401).send('Invalid credentials');
      }

      const payload = { sub: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.send({ token });
    })
    .catch(err => {
      res.status(500).send(err.message || 'Error occurred while logging in');
    });
};

///////////////////////////////////////////////////

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const user = {
    id: req.body.id,
    name: req.body.name,
    registered_books: req.body.registered_books,
    fine: req.body.fine,
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User.",
      });
    });
};

// exports.findAll = (req, res) => {
//   const id = req.query.id;
//   var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

//   User.findAll({ where: condition })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving User.",
//       });
//     });
// };

exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const limit = size ? parseInt(size) : 10;
  const offset = page ? (parseInt(page) - 1) * limit : 0;

  User.findAndCountAll({
    limit: limit,
    offset: offset,
  })
    .then((data) => {
      const totalPages = Math.ceil(data.count / limit);
      res.send({
        totalItems: data.count,
        totalPages: totalPages,
        currentPage: page ? parseInt(page) : 1,
        users: data.rows,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User data.",
      });
    });
};

exports.filterByName = (req, res) => {
  const { page, size, name } = req.query;
  const limit = size ? parseInt(size) : 10;
  const offset = page ? (parseInt(page) - 1) * limit : 0;
  const whereClause = name ? { name: { [Op.like]: `%${name}%` } } : {};

  User.findAndCountAll({
    limit: limit,
    offset: offset,
    where: whereClause,
  })
    .then((data) => {
      const totalPages = Math.ceil(data.count / limit);
      res.send({
        totalItems: data.count,
        totalPages: totalPages,
        currentPage: page ? parseInt(page) : 1,
        users: data.rows,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User data.",
      });
    });
};


exports.filterByNameAndFine = (req, res) => {
const { page, size, name, fine } = req.query;
const limit = size ? parseInt(size) : 10;
const offset = page ? (parseInt(page) - 1) * limit : 0;
const whereClause = {};

if (name) {
  whereClause.name = { [Op.like]: `%${name}%` };
}

if (fine) {
  whereClause.fine = { [Op.gte]: parseInt(fine) };
}

User.findAndCountAll({
  limit: limit,
  offset: offset,
  where: whereClause,
})
    .then((data) => {
      const totalPages = Math.ceil(data.count / limit);
      res.send({
        totalItems: data.count,
        totalPages: totalPages,
        currentPage: page ? parseInt(page) : 1,
        users: data.rows,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User data.",
      });
    });
};



exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User data with id=" + id,
      });
    });
};

exports.findOneFine = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Retrieve borrowing history and fines from database
    // and return them in the response
    //const borrowingHistory = await user.getBorrowingHistory();
    const fines = await user.fine;
    res.json({ fines });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.checkuser=async (req, res) => {
  try {
    const { name } = req.body;
    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    return res.status(400).json({ message: "Username doesnot exists" })
    // const newUser = await User.create({ name });

    // await Login.create({ id: newUser.id });
    // res.json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User table was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User Data with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
    User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} User Table data were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all User data.",
      });
    });
};

