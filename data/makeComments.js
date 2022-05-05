// create, update, delete, get 

// const { ObjectID } = require("bson");
ObjectId = require('mongodb').ObjectId

const mongoCollections = require("../config/mongoCollections");
const { all } = require("../routes/users");
const posts = mongoCollections.posts;


function checkValue(value) {
    if (!value) throw `${value} not provided, please provide.`;
  }
  
  function checkIsString(str) {
    if (typeof str !== "string") throw `${str} is not a string`;
    if (str.trim().length === 0) throw "String contains only spaces";
    if (str.length === 0) throw `${str} is empty`;
  }

async function createComment(id, user, date, comment){
    checkValue(user);
    checkIsString(user);

    if (!date) throw "date is empty";

    checkIsString(comment);


    const comment_detail = {
        _id: ObjectId(id),
        user: user,
        date: date, 
        comment: comment
    };
      try{
        const postCollection = await posts();
      const updateInfo = await postCollection.updateOne(
        { _id: ObjectId(id)},
        { $addToSet: { comments: { _id: ObjectId(), user: user, date: date, comment: comment } } }
    )
    console.log(updateInfo);
    if (!updateInfo.acknowledged) {
        throw `insertion of comment failed`;
      } else {
        return { message: "Comment is posted successfully" };
      }
      }
      catch (error) {
        console.log("error", error);
      }

}

module.exports = {
    createComment
}