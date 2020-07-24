var mongoose = require("mongoose");
var Petshop = require("./models/petshop");
var Comment   = require("./models/comment");

var data = [
    {
        name: "alina & alva", 
        image: "https://pixabay.com/get/53e3dd4b4b57ad14f1dc84609620367d1c3ed9e04e507440702a7edc954cc4_340.jpg",
        description: "alina & alva is a lovely sister, which love each other everyday and go everywhere every moment.Welcome to make a friend with them!"
    },
    {
        name: "beverlyn", 
        image: "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg",
        description: "beverlyn is an outgoing dog, which may make you annoy. But, it can bring a lot of happ feelings for you. Welcome to make a friend with it!"
    },
    {
        name: "Jill", 
        image: "https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg",
        description: "Jill is a little cat, which is a little bit shy. But, it is naughty sometimes. Welcome to make a friend with it!"
    }
]

function seedDB(){
   //Remove all campgrounds
   Petshop.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed petshops!");
         //add a few campgrounds
        data.forEach(function(seed){
            Petshop.create(seed, function(err, petshop){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a petshop");
                    //create a comment
                    Comment.create(
                        {
                            text: "This pet is cute, but I wish it can be more outgoing.",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                petshop.comments.push(comment);
                                petshop.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;