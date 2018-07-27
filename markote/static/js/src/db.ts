import PouchDB from 'pouchdb'
import pouchDBFind from 'pouchdb-find'

PouchDB.plugin(pouchDBFind)

const db = new PouchDB('markote')

export default db
