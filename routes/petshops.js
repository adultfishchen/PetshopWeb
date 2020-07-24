var express = require("express");
var router  = express.Router();
var Petshop = require("../models/petshop");
var middleware = require("../middleware");
var request = require("request");

//INDEX - show all petshops
router.get("/", function(req, res){
    // Get all petshops from DB
    Petshop.find({}, function(err, allPetshops){
       if(err){
           console.log(err);
       } else {
                res.render("petshops/index",{petshops:allPetshops});
	   }
                


    });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newPetshop = {name: name, image: image, description: desc, author:author}
    // Create a new campground and save to DB
    Petshop.create(newPetshop, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/petshops");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("petshops/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Petshop.findById(req.params.id).populate("comments").exec(function(err, foundPetshop){
        if(err){
            console.log(err);
        } else {
            console.log(foundPetshop)
            //render show template with that campground
            res.render("petshops/show", {petshop: foundPetshop});
        }
    });
});

router.get("/:id/edit", middleware.checkUserPetshop, function(req, res){
    console.log("IN EDIT!");
    //find the campground with provided ID
    Petshop.findById(req.params.id, function(err, foundPetshop){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("petshops/edit", {petshop: foundPetshop});
        }
    });
});

router.put("/:id", function(req, res){
    var newData = {name: req.body.name, image: req.body.image, description: req.body.desc};
    Petshop.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, petshop){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/petshops/" + petshop._id);
        }
    });
});


//middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.flash("error", "You must be signed in to do that!");
//     res.redirect("/login");
// }

module.exports = router;