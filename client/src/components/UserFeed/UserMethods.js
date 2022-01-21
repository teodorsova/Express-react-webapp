import { EventEmitter } from 'fbemitter';


const SERVER = 'http://localhost:3001'

class UserMethods {
    constructor () {
        this.data = []
        this.emitter = new EventEmitter()
    }

    async getUsers() {
        try {
            const response = await fetch(`${SERVER}/api/user`)
            /*if (!response.ok) {
                throw response
            }*/
            var values = await response.json()
            this.data = values;
            this.emitter.emit('GET_USERS_SUCCESS')
        } catch (err) {
            console.warn(err)
            this.emitter.emit('GET_USERS_FAILED')
        }
    }

}

const users = new UserMethods()

export default users