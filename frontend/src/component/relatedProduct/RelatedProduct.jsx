import React from 'react'
import "./RelatedProduct.css"
import data_product from "../assets/data"
import { Item } from '../Item/Item'
export const RelatedProduct = () => {
  return (
    <div className='relatedProduct'>
       <h1>Releted product</h1>
       <hr />
        <div className="relatedproduct-item">
         {data_product.map((item,i)=>{
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                old_price={item.old_price}
                new_price={item.new_price}
                image={item.image}
              />
            );
         })}
        </div>
    </div> 
  )
}
