import React, { useState } from 'react';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const ExploreFood = () => {

  const [category, setCategory] = useState('All');
  const [searchtext, setSearchtext] = useState('');
  return (
    
    <>
        <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form action="" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group mb-3">
              <select className="form-select mt-2" id="" style={{'maxWidth': '150px'}} onChange={(e) =>setCategory( e.target.value)}>
                <option value="All">All</option>
                <option value="Biryani">Biriyani</option>
                <option value="Burger">Burger</option>
                <option value="Cakes">Cakes</option>
                <option value="Ice creams">Ice creams</option>
                <option value="Rolls and Puffs">Rolls and Puffs</option>
                <option value="SoftDrinks">SoftDrinks</option>
                <option value="Noodles">Noodles</option>
              </select>
              <input type="text" className='form-control mt-2' placeholder='Search your favourite dish...' onChange={(e)=> setSearchtext(e.target.value)} value={searchtext} />
              <button className='btn btn-primary mt-2' type='submit'>
                <i className='bi bi-search'></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>    
    <FoodDisplay  category={category} searchtext={searchtext}/>
    </>

  )
}

export default ExploreFood;