const db = require("../models");
const Tutorial = db.tutorials;
const Comment = db.comments;

// Create and Save new Tutorials
exports.createTutorial = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(">> Error while creating tutorial: " + err);
    });
};

// Create and Save new Comments
exports.createComment = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Comment
  const comment = {
    name: req.body.name,
    text: req.body.text,
    tutorialId: req.body.tutorialId,
  };

  // Save Comment in the database
  Comment.create(comment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(">> Error while creating comment: " + err);
    });
};

//Get the comments for a given tutorial
exports.findTutorialById = (req, res) => {
  const tutorialId = req.params.id;

  Tutorial.findByPk(tutorialId, { include: ["comments"] })
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({ 
          message: "Cannot find Tutorial with id=" + tutorialId
        })
      }
    })
    .catch((err) => {
      res.send(">> Error while finding tutorial: " + err);
    });
};

//Get the comments for a given comment id
exports.findCommentById = (req, res) => {
  const commentId = req.params.id;

  Comment.findByPk(commentId, { include: ["tutorial"] })
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({ 
          message: "Cannot find Comment with id=" + commentId
        })
      }
      
    })
    .catch((err) => {
      res.send(">> Error while finding comment: " + err);
    });
};

// Get all Tutorials include comments
exports.findAll = (req, res) => {
  Tutorial.findAll({include: ["comments"]
  }).then((data) => {
    res.send(data);
  });
};


exports.updateTutorialById = (req, res) => { 
  const tutorialId = req.params.id;
  Tutorial.update(req.body, {
    where: { id: tutorialId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${tutorialId}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + tutorialId
      });
    });
}

exports.updateCommentById = (req, res) => { 
  const commentId = req.params.id;
  Comment.update(req.body, {
    where: { id: commentId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Comment with id=${commentId}. Maybe Comment was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Comment with id=" + commentId
      });
    });
}


exports.deleteCommentById = (req, res) => { 
  const commentId = req.params.id;
  Comment.destroy({
    where: { id: commentId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${commentId}. Maybe Comment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + commentId
      });
    });
}
