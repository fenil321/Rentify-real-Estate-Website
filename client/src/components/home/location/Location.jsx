import React from "react"
import Heading from "../../common/Heading"
import { location } from "../../data/Data"
import "./style.css"
import useFetch from "../../hooks/useFetch"

const Location = () => {
  const {data,loading,error} =useFetch("/houses/countByCity?cities=NewOrleans,Jerrsy,Liverpool,NewYork,Montreal,California");
  console.log(data); 
  return (
    <>
      <section className='location padding'>
        <div className='container'>
          <Heading title='Explore By Location' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' />

          <div className='content grid3 mtop'>
            {location.map((item, index) => (
              <div className='box' key={index}>
                <img src={item.cover} alt='' />
                <div className='overlay'>
                  <h5>{item.name}</h5>
                  <p>
                    <label>{data[index]}</label>
                    <label>{item.Offices}</label>
                    <label>{item.Apartments}</label>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Location
