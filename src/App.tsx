/*
 * @Author: yeyu98
 * @Date: 2023-08-20 22:08:13
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-03-03 14:30:51
 * @Description: 
 */
/*
 * @Author: xiaohu
 * @Date: 2023-08-16 10:31:41
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-03-03 14:29:38
 * @FilePath: \react-typescript-template\src\App.tsx
 * @Description: 
 */
import React, { Suspense, lazy, useEffect, useState }  from 'react'
import Demo from "@/components/Demo"
import DemoTwo from "@/components/DemoTwo"
import fivekb from "@/assets/images/5kb.png"
import twitykb from "@/assets/images/22kb.png"
import './App.less'
import axios from 'axios'
import { change } from './change'

const LazyLoadPreFetchDemo = lazy(() => import(
  /* webpackChunkName: "PreFetchDemo" */ 
  /* webpackPrefetch: true */ 
  "@/components/PreFetchDemo"
))
const LazyLoadPreLoadDemo = lazy(() => import(
  /* webpackChunkName: "PreLoadDemo" */ 
  /* webpackPreload: true */ 
  "@/components/PreLoadDemo"
))

interface Props {}

function App(props: Props) {
  const {} = props
  const [ count, setCounts ] = useState('')
  const [ show, setShow ] = useState(false)
  const onChange = (e: any) => {
    console.log(e)
    setCounts(e.target.value)
  }
  const checkNewVersion = () => {
    axios.get(`/version.json?timestamp=${Date.now()}`).then(res => {
      const {version} = res.data
      const localVersion = localStorage.getItem('version')
      if(localVersion && localVersion !== version) {
        localStorage.setItem('version', version)
        const result = confirm('检测到新版本，是否刷新页面')
        if(result) {
          window.location.reload()
        }
      } else {
        localStorage.setItem('version', version)
      }
    })
  }

  const handleFileChange = () => {
    change()
  }

  useEffect(() => {
    console.log(`process.env.NODE_ENV：${process.env.NODE_ENV}`)
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
      <br />
      <h3>资源懒加载</h3>
      <button onClick={checkNewVersion}>检测是否有新版本</button>
      <button onClick={handleFileChange}>文件变更</button>
      <button onClick={() => setShow(!show)}>加载</button>
      {
        show && <Suspense fallback={<div>加载中...</div>}>
          <LazyLoadPreFetchDemo />
          <LazyLoadPreLoadDemo />
        </Suspense>
      }
    </>
  )
}

export default App
