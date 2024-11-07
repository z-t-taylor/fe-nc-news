import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import ArticlesList from './components/ArticlesList'
import SingleArticle from './components/SingleArticle'
import { UserProvider } from './contexts/userContext'
import TopicsList from './components/TopicsList'

function App() {
  return (
    <>
      <UserProvider>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/articles' element={<ArticlesList/>}/>
          <Route path='/articles/:article_id' element={<SingleArticle />} />
          <Route path='/topics' element={<TopicsList />} />
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
