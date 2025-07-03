import "./list.css"
import { React , useEffect, useState } from 'react'
import SearchItem from "../SearchItem/SearchItem"
import { useLocation } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function List() {
    const location = useLocation();
    const [sort, setSort] = useState("createdAt");
    const [destination,setDestination] = useState(location.state.destination)
    const [price,setPrice] = useState(location.state.price)
    const [min,setMin] = useState(undefined)
    const [max,setMax] = useState(undefined)
    const[open,setOpen] = useState(false);
    const[openModel,setOpenModel] = useState(false);

    const { data,loading,error,reFetch} = useFetch(`/houses?city=${destination}&min=${min || 0 }&max=${max || 999000}`);
     
    const reSort = (type) => {
        setSort(type);
        setOpen(false);
      };

      useEffect(() => {
        reFetch();
      }, [sort]);

    const handlefilter = ()=>{
              setOpenModel(true);
      }

    const handleClick=()=>{
        reFetch();
    }
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
          <button onClick={handlefilter} >More Filters</button>
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
                  <span onClick={() => reSort("createdAt")}>Best Renting</span>
                  )}
                  <span onClick={() => reSort("ratings")}> Popular</span>
              </div>
            )}
          </div>
          </div>
          </div>
        </div>
         <div className="listContainer">
            <div className="listWrapper">
            {openModel && <div className="listSearch">
            <FontAwesomeIcon icon={faCircleXmark} className="rclose" onClick={()=>setOpenModel(false)}/>
                    <h1 className="isTitle">Search</h1>
                    <div className="isItem">
                        <label>Destination</label>
                        <input type="text" placeholder="Enter Destination"></input>
                        <div className="isItem">
                            <label>Options</label>
                            <div className="isOptions">
                            <div className="isOptionItem">
                                <span className="isOptionText">
                                    Min Price <small>in rupees</small>
                                </span>
                                <input type="number" onChange={e=>setMin(e.target.value)} className="isOptionInput"></input>
                            </div>
                            <div className="isOptionItem">
                                <span className="isOptionText">
                                    Max Price <small>in rupees</small>
                                </span>
                                <input type="number" onChange={e=>setMax(e.target.value)} className="isOptionInput"></input>
                            </div>
                            <div className="isOptionItem">
                                <span className="isOptionText">
                                    Property Type  
                                </span>
                                <input type="number" className="isOptionInput"></input>
                            </div>
                            <div className="isOptionItem">
                                <span className="isOptionText">
                                    Square foot  
                                </span>
                                <input type="number" className="isOptionInput"></input>
                            </div>
                            <div className="isOptionItem">
                                <span className="isOptionText">
                                    Rooms <small>BHK</small>
                                </span>
                                <input type="number" className="isOptionInput"></input>
                            </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleClick}>Search</button>
                </div>
}
                <div className="listResult">
                    {loading ? "Loading Please Wait" :<>
                    {data.map(item=>(
                         <SearchItem item={item} key={item._id}/> 
                    ))}
                          </>}
                </div>
            </div>
         </div>
    </div>
  )
}

export default List