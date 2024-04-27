import React from 'react'
import {useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import { BreadCrum } from '../component/breadCrum/BreadCrum';
import { ProductDisplay } from '../component/productDisplay/ProductDisplay';
import { DescriptionBox } from '../component/descriptionBox/DescriptionBox';
import { RelatedProduct } from '../component/relatedProduct/RelatedProduct';
export const Product = () => {
  const items = useSelector((state) => state.items);
  const {productId}=useParams()
  const product=items.state.find(e=>e.id===Number(productId))
  return (
    <div>
      <BreadCrum product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProduct/>
    </div>
  )
}
