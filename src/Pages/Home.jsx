import React from 'react'

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock.jsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";

 const Home = ({searchValue}) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setcategoryId] = React.useState(0)
  const [sortType,setSortType] = React.useState({name:'популярности', sortProperty:'rating'}) 

  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.sortProperty.replace('-','')
    const category = categoryId > 0 ? `category=${categoryId}` : ''

    fetch(`https://645a6a4a95624ceb210148ff.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
      window.scrollTo(0,0)
  }, [categoryId,sortType]);

  const pizzas = items.filter(obj => {
    if(obj.title.includes(searchValue)){
      return true
    }
    return false
  }).map((obj) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (    
      <div className="container">
        <div className="content__top">
              <Categories value={categoryId} onChangeCategory={(i) => setcategoryId(i)}/>
              <Sort value={sortType} onChangeSort={(i) => setSortType(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {isLoading
                ? skeletons
                : pizzas}
            </div>
      </div>
    
  )
}
export default Home
