import express from "express"
import questionRouter from "./apps/questionRouter.js"
const app = express()
const port = 8888

app.use(express.json())
app.use(express.urlencoded({extended: true}))

function init () {

    app.use("/questions",questionRouter)

    app.listen(port, () => {
        console.log(`${port}`)
    })
}

init()