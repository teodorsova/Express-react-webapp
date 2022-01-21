import { useEffect, useState } from 'react'
import store from './FoodStore'
import Food from './Food'

function FoodListView(props) {
  const userName=props.userName
  const [foodListings, setfoodListings] = useState([{"id": 1}])

  useEffect(() => {
    store.getListings()
    store.emitter.addListener('GET_LISTINGS_SUCCESS', () => {
      setfoodListings(store.data);
  })
    
  }, [])

  return (
    <div>
      {
        console.log(foodListings)
      }
        <h2 className='mb-5 mt-4'>Listings:</h2>
        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
        {
            foodListings.map((e) => {
            return( <Food key={e.id} item={e} userName={userName} />)
          })
        }
        </div>
    </div>
  )
}

export default FoodListView