import { useEffect, useState } from 'react'
import Footer from "./components/Footer"
import Main from "./components/Main"
import Sidebar from "./components/Sidebar"

function App() {
  
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  
  function handleToggleModal() {
    setShowModal(!showModal)
  }
  
  // way we fetch data from an API is a useEffect hook
  useEffect(()=>{
    //logic to be executed
    
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`

      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`
      if(localStorage.getItem(localStorage)) {
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log('Fetched from cache today')
        console.log(apiData)
        return
      } //if we get past this - it means localStorage doesn't work
      localStorage.clear()

      try {
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from API today')
        console.log(apiData)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchAPIData();
  },[])//dependency array
  //blank dependcy array means - run when loaded
  //or variable in there, only runs when the variable changes
  return (
    <>
      { data ? (<Main data={data}/>) : 
        <div className='loadingState'>
          <i className="fa-solid fa-gear"></i>
        </div>
      }
      
      {/* only show Sidebar if showModal is true */}
      {showModal && 
        <Sidebar data={data} handleToggleModal={handleToggleModal}/>}
      {data && (<Footer data={data} handleToggleModal={handleToggleModal} />)}
    </>
  )
}

export default App
