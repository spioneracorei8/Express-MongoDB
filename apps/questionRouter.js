import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";
const questionRouter = Router();


// get all questions
questionRouter.get("/", async (req, res) => {
  const collection = db.collection("questions");
  try {
    const response = await collection.find({}).limit(5).toArray();

    return res.json({
      data: response,
    });
  } catch (error) {
    return res.json({
      message: "Has something wrong in database",
      error,
    });
  }
});

// get questions by questionId
questionRouter.get("/:questionId",async (req,res) => {
  const collection = db.collection("questions")
  const questionId = new ObjectId(req.params.questionId)

  try {
    const response = await collection.find({_id: questionId}).toArray()

    return res.json({
      data: response[0]
    })
  }  catch (error) {
    return res.json({
      message: "Has something wrong in database",
      error
    })
  } 


})

// create new question
questionRouter.post("/", async (req, res) => {
  const collection = db.collection("questions");

  try {
    await collection.insertOne({...req.body});

    return res.json({
      message: "Created new question successfully."
    })
  } catch (error) {
    return res.json({
      message: "Has something wrong in database",
      error,
    });
  }
});

// Edit question by questionId
questionRouter.put("/:questionId", async (req,res) => {
  const collection = db.collection("questions")
  const questionId = new ObjectId(req.params.questionId)

  try {
    await collection.updateOne(
      {_id: questionId
      },
      {
        $set: {...req.body}
      })

      return res.json({
        message: `Question has been updated successfully.`
      })
  } catch (error) {
    return res.json({
      message: "Has something wrong in database",
      error
    })
  }
})

// Delete question by questionId
questionRouter.delete("/:questionId", async (req,res) => {
  const collection = db.collection("questions")
  const questionId = new ObjectId(req.params.questionId)

  try {
    await collection.deleteOne(
      {
        _id: questionId
      }
    )
    return res.json({
      message: "Question has been deleted successfully." 
    })
  } catch (error) {
    return res.json({
      message: "Has something wrong in database",
      error
    })
  }

})

export default questionRouter;
