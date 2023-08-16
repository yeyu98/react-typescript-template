/*
 * @Author: xiaohu
 * @Date: 2023-08-16 10:31:41
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-16 22:55:51
 * @FilePath: \react-typescript-template\src\App.tsx
 * @Description: 
 */
import React from 'react'
import './App.less'

interface Props {}

function App(props: Props) {
  const {} = props
  console.log(`process.env.NODE_ENV：${process.env.NODE_ENV}`)
  console.log(`process.env.BASE_ENV：${process.env.BASE_ENV}`)

  return (
    <>
      <h3>react-typescript-template</h3>
    </>
  )
}

export default App
