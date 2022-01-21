import { EventEmitter } from 'fbemitter';


const SERVER = 'http://localhost:3001'

class FoodStore {
    constructor () {
        this.data = [{}]
        this.emitter = new EventEmitter()
    }

    async getListings() {
        try {
            const response = await fetch(`${SERVER}/api/listing`)
            /*if (!response.ok) {
                throw response
            }*/

            var values = await response.json()

            this.data = values;
            this.emitter.emit('GET_LISTINGS_SUCCESS')
        } catch (err) {
            console.warn(err)
            this.emitter.emit('GET_LISTINGS_FAILED')
        }
    }

}

const store = new FoodStore()

export default store