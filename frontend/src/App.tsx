//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '../public/vite.svg'
import NewsCard from '../modules/NewsCard'
import FeedSelector from '../modules/FeedSelector'
import Sidebar from '../modules/Sidebar';
import './App.css'

function App() {
//  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar />
      <FeedSelector/>
      <NewsCard />
    </>
  )
}

export default App
