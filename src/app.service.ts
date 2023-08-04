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
  
        for await (const doc of cursor) {
          console.log(doc)
        }
      } finally {
        await client.close()
      }
    }

    run().catch(console.log)
  }
}
