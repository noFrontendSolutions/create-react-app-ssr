import { Request, Response } from "express"
import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
//import mongoConnectAirbnb from "./database/mongo-connect-airbnb"
import * as mongoDB from "mongodb"
import "dotenv/config"
import initialConnectionAirbnb from "./database/mongo-connect-airbnb"

const url: string = process.env.MONGO_URI || ""
const port: number | string = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())

app.get("/airbnb", async (req: Request, res: Response) => {
  const client: mongoDB.MongoClient = new MongoClient(url)
  try {
    const initialLoad = await initialConnectionAirbnb(client)
    await client.close()
    res.send(initialLoad)
  } catch (err) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
