import React from 'react'
import { Routes, Route } from "react-router-dom";

import {
  HomePage,
  ItemInfoPage,
  ItemInfoCreatePage,
} from '../pages';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/item-info" element={<ItemInfoPage />} />
      <Route path="/item-info-create" element={<ItemInfoCreatePage />} />
    </Routes>
  )
}

export { Router }
