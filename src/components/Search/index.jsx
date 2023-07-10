import React from 'react'
import styles from './Search.module.scss'
import closeIcon from '../../assets/img/closeIcon.svg'
import searchIcon from '../../assets/img/searchIcon.svg'
 const Search = ({searchValue, setSearchValue}) => {
  return (
    <div  className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt='SearchIcon' />
      <input value={searchValue} onChange={event => setSearchValue(event.target.value)} className={styles.input} placeholder='Поиск пиццы...' />
      {  searchValue && 
      (<img onClick={() => setSearchValue('')} className={styles.closeIcon} src={closeIcon} alt='closeIcon' />)  
      }
    </div>
  )
}
export default Search