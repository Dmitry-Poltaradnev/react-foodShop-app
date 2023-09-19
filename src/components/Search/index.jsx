import React from 'react'
import debounce from 'lodash.debounce'
import styles from './Search.module.scss'
import closeIcon from '../../assets/img/closeIcon.svg'
import searchIcon from '../../assets/img/searchIcon.svg'
import { useDispatch } from 'react-redux'
import {setSearchValue} from '../../redux/slices/filterSlice'

 const Search = () => {
  const dispatch = useDispatch()
  const [value,setValue] = React.useState('')
  const inputRef = React.useRef() 

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    },1000),
    [],
  )
   
  const onChangeInput = (event) =>{
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  const onClickClear = () => {
   dispatch(setSearchValue(''))
   setValue('')
   inputRef.current.focus()
  }

  return (
    <div  className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt='SearchIcon' />
      <input onChange={onChangeInput} ref={inputRef} value={value}  className={styles.input} placeholder='Поиск пиццы...' />
      {  value && 
      (<img onClick={onClickClear} className={styles.closeIcon} src={closeIcon} alt='closeIcon' />)  
      }
    </div>
  )
}
export default Search