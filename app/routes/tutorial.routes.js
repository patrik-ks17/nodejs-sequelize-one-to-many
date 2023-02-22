module.exports = app => {
	const tutorials = require("../controllers/tutorial.controller.js");
 
	var router = require("express").Router();
 
	// Create a new Tutorial
	router.post("/tutorials", tutorials.createTutorial);
 
	// Retrieve all Tutorials
	router.get("/tutorials", tutorials.findAll);
 
	// Retrieve a single Tutorial with id
	router.get("/tutorials/:id", tutorials.findTutorialById);

	// Create a new Comment
	router.post("/comments", tutorials.createComment);
	
	// Retrieve a single Comment with id
	router.get("/comments/:id", tutorials.findCommentById);

	// Update Tutorial with id
	router.put("/tutorials/:id", tutorials.updateTutorialById)

	// Update Comment with id 
	router.put("/comments/:id", tutorials.updateCommentById)

	// Delete a Comment with id
	router.delete("/comments/:id", tutorials.deleteCommentById)

 
	app.use('/api', router);
 };