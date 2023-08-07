import { Injectable } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb'

@Injectable()
export class AppService {
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

  async getProgramData(id: string) {
    const client = new MongoClient(process.env.MONGO_URI)
    let output = []

    try {
      const database = client.db('degree_programs_site')
      const programs = database.collection('degreePrograms')
  
      const query = {
        _id: new ObjectId(id)
      }
  
      const cursor = programs.find(query)
  
      if ((await programs.countDocuments(query)) === 0) {
        console.log("No documents found!");
      }
  
      for await (const doc of cursor) {
        output.push(doc)
      }
    } finally {
      client.close()
    }

    if (output[0]) {
      return output[0]
    } else {
      return {
        message: 'Not found'
      }
    }
  }
}
