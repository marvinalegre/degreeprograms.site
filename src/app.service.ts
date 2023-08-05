import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb'

@Injectable()
export class AppService {
  findAll() {
    const client = new MongoClient(process.env.MONGO_URI)

    async function run() {
      try {

        const database = client.db("nestjs")
        const cats = database.collection("cats")

        const query = {}
        const options = {}

        const cursor = cats.find(query, options)

        if ((await cats.countDocuments(query)) === 0) {
          console.log('No documents found!')
        }

        let list = []
        for await (const doc of cursor) {
          list.push(doc)
        }

        return list
      } finally {
        await client.close()
      }
    }

    return run().catch(console.log)
  }

  parseCsv(str: string): {
    years: number[],
    values: number[]
  } {
    str = str.replace(/ /g, "")
    let arr = str.split("\r\n")

    let years: number[] = []
    let values: number[] = []
    for (let pair of arr) {
      let pairArr: string[] = pair.split(",")

      years.push(parseInt(pairArr[0]))
      values.push(parseInt(pairArr[1]))
    }

    return {
      years,
      values
    }
  }

  async create(doc) {
    const client = new MongoClient(process.env.MONGO_URI)

    async function run() {
      try {

        const database = client.db("degree_programs_site")
        const degreePrograms = database.collection("degreePrograms")

        const result = await degreePrograms.insertOne(doc)

        console.log(`A document was inserted with the _id: ${result.insertedId}`)
        return result.insertedId.toString()
      } finally {
        await client.close()
      }
    }

    return await run()
  }
}
