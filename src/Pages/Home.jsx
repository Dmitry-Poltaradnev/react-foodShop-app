import React  from 'react'
import axios from 'axios'
import qs from 'qs'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Categories from "../components/Categories";
import Sort, {  sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock.jsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import Pagination from '../components/Pagination/index'
import { SearchContext } from '../App';
import {setCategoryId,setCurrentPage,setFilters} from '../redux/slices/filterSlice'


 const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)
  const {categoryId, sort,currentPage} = useSelector(state => state.filter)

  const {searchValue} = React.useContext(SearchContext)
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [categoryId, setcategoryId] = React.useState(0)

  // const [sortType,setSortType] = React.useState({name:'популярности', sortProperty:'rating'}) 

 const onChangeCategory = (id) =>{
  dispatch(setCategoryId(id))
 }
 const onChangePage = number =>{
  dispatch(setCurrentPage(number))
 }

const fetchPizzas = () =>{
  setIsLoading(true);

  const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
  const sortBy = sort.sortProperty.replace('-','')
  const category = categoryId > 0 ? `category=${categoryId}` : ''
  const search = searchValue ? `&search=${searchValue}` : ''
  // Вместо fetch переписываем на axios
 /*  fetch(`https://645a6a4a95624ceb210148ff.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    .then((res) => {
      return res.json();
    })
    .then((arr) => {
      setItems(arr);
      setIsLoading(false);
    }); */
    axios.get(`https://645a6a4a95624ceb210148ff.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`).then((res) => {
      setItems(res.data);
      setIsLoading(false);
    })     
  }
  // Если изменили параметры и был первый рендер, то будет проверка
  React.useEffect(() => {
    if(isMounted.current){
     const queryString = qs.stringify({
       sortProperty: sort.sortProperty,categoryId,currentPage
     })
     navigate(`?${queryString}`)
    }
    isMounted.current = true
    },[categoryId,sort.sortProperty, currentPage])

    // Если был первый рендер, то проверяем URL- параметры и сохраняем в Redux
  React.useEffect(() =>{
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1))
      
      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

      dispatch(setFilters({
        ...params,
        sort
      }))
      isSearch.current = true
}
},[])

// Если был первый рендер, то запрашиваем пиццы
React.useEffect(() => {
    window.scrollTo(0,0)

    if(!isSearch.current){
     fetchPizzas()
    }

    isSearch.current = false
  }, [categoryId,sort.sortProperty,searchValue, currentPage]);

  // Фильтрация при динамике
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  // Фильтрация товаров при статике.
 /*  const pizzas = items.filter(obj => {
    if(obj.title.toLowerCase().includes(searchValue.toLowerCase())){
      return true
    }
    return false
  }).map((obj) => <PizzaBlock key={obj.id} {...obj} />) */



  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (    
      <div className="container">
        <div className="content__top">
              <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {isLoading
                ? skeletons
                : pizzas}
            </div>
           <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
      </div>    
  )
}
export default Home
