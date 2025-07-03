import React from "react"
import Header from "../common/header/Header"
import { BrowserRouter , Router, Routes , Route } from "react-router-dom"
import Home from "../home/Home"
import Footer from "../common/footer/Footer"
import About from "../about/About"
import Blog from "../blog/Blog"
import Services from "../services/Services"
import Contact from "../contact/Contact"
import List from "../List/List"
import House from "../House/House"
import Login from "../../Login/Login"
import HouseListingForm from "../common/header/HouseListingForm"
import ForRent from "../ForRent"
import Register from "../Register/Register"
import Orders from "../Orders/Orders"
import Messages from "../messages/Messages"
import Message from "../Message/Message"
import Add from "../My properities/Add/Add"
import MyGigs from "../My properities/MyProp"
import UpdateHouse from "../Update House/updateHouse"

const Pages = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/services' element={<Services />} />
          <Route exact path='/blog' element={<Blog />} />
          {/* <Route exact path='/pricing' element={<Pricing />} /> */}
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/houses' element={<List />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/houses/:id' element={<House />} />
          <Route exact path='/HouseListingForm' element={<HouseListingForm />} />
          <Route exact path='/house-rent' element={<ForRent />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/myfavourites' element={<Orders />} />
          <Route exact path='/messages' element={<Messages />} />
          <Route exact path='/message/:id' element={<Message />} />
          <Route exact path='/add' element={<Add />} />
          <Route exact path='/myproperties' element={<MyGigs />} />
          <Route exact path='/update-property/:id' element={<UpdateHouse />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default Pages
