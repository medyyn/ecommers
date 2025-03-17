import React from 'react'
import Home from '../../Pages/Home'
import ProductDetail from '../../Pages/ProductDetail'
import { Route, Routes } from 'react-router'
import NotFound from '../NotFound'
import Basket from '../../Pages/Basket'

const WebRoutes = () => {
    const routes = [
        {id:0, path: "/", element: <Home/>},
        {id:1, path: "/products/:slug", element: <ProductDetail/>},
        {id:2, path: "/basket", element: <Basket/>}
    ]
  return (
    <Routes>
        {
            routes.map(({id, path, element}) => {
                return <Route path={path} element={element} key={id}/>
            })
        }
        <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default WebRoutes