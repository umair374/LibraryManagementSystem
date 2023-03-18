const db = require("../models");
const Login = db.logins;
const Op = db.Sequelize.Op;

// Create and Save a new login
exports.create = (req, res) => {
    message: "Adding new data !"
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // register login info
  const login = {
    id: req.body.id,
    Password: req.body.Password,
  };

  // Save login in the database
  Login.create(login)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// Retrieve all LOgin info from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Login.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving logins.",
      });
    });
};


// Find a single login with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Login.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find login with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving login data with id=" + id,
      });
    });
};

// Update a Login by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Login.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "LOGIN table was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update LOGIn with id=${id}. Maybe LOGIN was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Login with id=" + id,
      });
    });
};

// Delete a Login with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Login.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "LOGIN was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete LOGIN with id=${id}. Maybe LOGIN was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete LOGIN Data with id=" + id,
      });
    });
};

// Delete all Logins from the database.
exports.deleteAll = (req, res) => {
    Login.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Login Table data were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all login data.",
      });
    });
};

