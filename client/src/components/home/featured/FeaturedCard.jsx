import React from "react"
import { featured } from "../../data/Data"
import useFetch from "../../hooks/useFetch"
import { Link } from "react-router-dom";
const FeaturedCard = () => {
  const {data,loading,error} =useFetch("/houses/countByType");
  return (
    <>
    <Link to="/house-rent?type=House">
      <div className='content grid5 mtop'>
        {featured.map((items, index) => (
          <div className='box' key={index}>
            <img src={items.cover} alt='' />
            <h4>{data[index]?.type}</h4>
            <label>{data[index]?.count} Properties</label>
          </div>
        ))}
      </div>
      </Link>
    </>
  )
}

export default FeaturedCard

