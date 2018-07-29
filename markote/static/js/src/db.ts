import localForage from 'localforage'

class Db {
    private instance: LocalForage

    constructor() {
        this.instance = localForage.createInstance({
            name: 'markote',
        })
    }

    public getItem(key) {
        return new Promise((resolve, reject) => {
            this.instance.getItem(key).then((value) => {
                if (value) {
                    resolve(value)
                } else {
                    reject()
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public setItem(key, value) {
        return this.instance.setItem(key, value)
    }

    public clear() {
        return this.instance.clear()
    }
}

const db = new Db()

export default db
