import React from "react"
import { list } from "../../data/Data"
import useFetch from "../../hooks/useFetch"

const RecentCard = () => {
  const {data,loading,error} =useFetch("/houses/feature?featured=true");
  const category = "For Rent";
  return (
    <>
      <div className='content grid3 mtop'>
        {data.map((val, index) => {
          return (
            <div className='box shadow' key={index}>
              <div className='img'>
                <img src={val.house_Image} alt='' />
              </div>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ background: category === "For Sale" ? "#25b5791a" : "#ff98001a", color: category === "For Sale" ? "#25b579" : "#ff9800" }}>{category}</span>
                  <i className='fa fa-heart'></i>
                </div>
                <h4>{val.name}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {val.city}
                </p>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2'>Rs.{val.price}</button> <label htmlFor=''>{val.distance}/sqft</label>
                </div>
                <span>{val.ratings}</span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
