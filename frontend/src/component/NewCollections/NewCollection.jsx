import React,{useEffect,useState} from "react";
import "./NewCollection.css";
import new_collection from "../assets/new_collections"
import { Item } from "../Item/Item";
import  axios from "axios"
export const NewCollection = () => {
  const [new_collection,setNewcollection]=useState([])
  useEffect(async()=>{
    const collection = await axios.get("http://localhost:4000/newcolletions");
    setNewcollection(collection.data.data)
  },[])
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item,i)=>{
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
  );
};
