import React from 'react'
import { useWhyDidYouUpdate } from 'ahooks';

type CategopriesProps = {
  value: number;
  onChangeCategory: (i:number)=> void
}

const categories = ['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые'] 

const Categories: React.FC<CategopriesProps>= React.memo(({value,onChangeCategory}) =>{

  useWhyDidYouUpdate('Categopries', {value,onChangeCategory})

  return (
    <div className="categories">
      <ul>          
        {
          categories.map((categoryName,index) => <li key={index} onClick={() => onChangeCategory(index)} className={value === index ? 'active': ''}>{categoryName}</li>)            
        }        
      </ul>
    </div>
  );
})

  export default Categories