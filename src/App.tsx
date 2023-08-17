/*
 * @Author: xiaohu
 * @Date: 2023-08-16 10:31:41
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-08-17 19:53:14
 * @FilePath: \react-typescript-template\src\App.tsx
 * @Description: 
 */
import React from 'react'
import fivekb from "@/assets/images/5kb.png"
import twitykb from "@/assets/images/22kb.png"
import './App.less'

interface Props {}

function App(props: Props) {
  const {} = props
  console.log(`process.env.NODE_ENV：${process.env.NODE_ENV}`)
  console.log(`process.env.BASE_ENV：${process.env.BASE_ENV}`)

  return (
    <>
      <h3>react-typescript-template</h3>
      <h5>大于10kb，移动到指定文件夹static/images下</h5>
      <img src={twitykb} />
      <h5>小于10kb，转base64</h5>
      <img src={fivekb} />
    </>
  )
}

export default App
