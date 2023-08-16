/*
 * @Author: xiaohu
 * @Date: 2023-08-16 10:31:47
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-08-16 10:47:36
 * @FilePath: \react-typescript-template\src\index.tsx
 * @Description: 
 */
import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"

const root: HTMLDivElement | null = document.querySelector('#root')

if(root) {
  createRoot(root).render(<App />)
}