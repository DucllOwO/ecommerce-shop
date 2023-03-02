import { useState } from 'react'
import styled from 'styled-components'
import Admin from './pages/admin/Admin.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from './pages/customer/Customer.js';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route key={'admin'} path='/admin' element={<Admin />}>
          </Route>
          <Route key={'customer'} path='/' element={<Customer />}>

          </Route>
        </Routes>
      </BrowserRouter>
    </Container >
  )
}

export default App
