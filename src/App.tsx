/*
 * @Author: xiaohu
 * @Date: 2023-08-16 10:31:41
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-08-20 16:42:52
 * @FilePath: \react-typescript-template\src\App.tsx
 * @Description: 
 */
import React, { useEffect, useState }  from 'react'
import Demo from "@/components/Demo"
import DemoTwo from "@/components/DemoTwo"
import fivekb from "@/assets/images/5kb.png"
import twitykb from "@/assets/images/22kb.png"
import './App.less'

interface Props {}

function App(props: Props) {
  const {} = props
  const [ count, setCounts ] = useState('')
  const onChange = (e: any) => {
    console.log(e)
    setCounts(e.target.value)
  }

  useEffect(() => {
    console.log(`process.env.NODE_ENV：${process.env.NODE_ENV}`)
    console.log(`process.env.BASE_ENV：${process.env.BASE_ENV}`)
  }, [])

  return (
    <>
      <h3>react-typescript-template</h3>
      <h5>大于10kb，移动到指定文件夹static/images下</h5>
      <img src={twitykb} />
      <h5>小于10kb，转base64</h5>
      <img src={fivekb} />
      {/* <h3>我被改了</h3> */}
      <p>受控组件</p>
      <input type="text" value={count} onChange={onChange} />
      <br />
      <p className='no-use'>非受控组件</p>
      <input type="text" />
      <Demo />
    </>
  )
}

export default App
