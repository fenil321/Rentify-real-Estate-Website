import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import "../components/HouseRent.css"
import "../App.css"
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function ForRent() {

    const [sort, setSort] = useState("createdAt");
    const [open, setOpen] = useState(false);
    const minRef = useRef();
  const maxRef = useRef();
  const category = "For Rent";

  const { search } = useLocation();

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
        axios.get(
          `/house-rent${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
      })

      const reSort = (type) => {
        setSort(type);
        setOpen(false);
      };

      useEffect(() => {
        refetch();
      }, [sort]);
      
      const apply = () => {
        refetch();
      };
  return (
    <div>
        <div className="gigs">
    <div className="container">
        <span className="breadcrumbs">Property Types - House :</span>
        <h1>House on Rent</h1>
        <p>
          Explore the boundaries of E-commerce and technology with Rentify
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input  ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "createdAt" ? "Best Selling" : "Newest"}
            </span>
           <img src="https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("createdAt")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("ratings")}> Popular</span>
              </div>
            )}
          </div>
        </div>
        </div>
        </div>
    <div className='Houses_container'>
{
       data && <div className="HousesList_container">
        {
            data.map(house=>{
                return(
                    <div className="Single_house">
                        {/* <Link to={`/houses/${house._id}`}><img src={house.house_Image} alt="" /></Link>
                        <h4 className='House_price'>{`RS.${house.price}`}</h4>
                        <h4 className='House_summary'>{`${house.BHK}} Available for Rent in ${house.city}`}</h4> */}
                        <div className='box shadow' key={house._id}>
              <div className='img'>
              <Link to={`/houses/${house._id}`}><img src={house?.house_Image} alt='' /></Link>
              </div>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ background: category === "For Sale" ? "#25b5791a" : "#ff98001a", color: category === "For Sale" ? "#25b579" : "#ff9800" }}>{category}</span>
                  <i className='fa fa-heart'></i>
                </div>
                <h4>{house?.name}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {house?.city}
                </p>
              </div>
              <div className='buttonflex'>
                <div>
                  <button className='btn2'>RS.{house?.price}</button> <label htmlFor=''>{house?.distance}/sqft</label>
                </div>
                <span>{!isNaN(house?.totalStars / house?.ratings) && (
                <div className="stars">
                    {Array(Math.round(house?.totalStars / house?.ratings))
                          .fill()
                          .map((item, i) => (
                            <img src="https://cdn.pixabay.com/photo/2021/10/11/00/58/star-6699069__340.png" alt="" key={i}/>
                          ))}
                  <span>{Math.round(house?.totalStars / house?.ratings)}</span>
                </div>
                 )}</span>
              </div>
            </div>
                    </div>
                )
            })
        }
       </div>
}
    </div>
    </div>
  )
}

export default ForRent