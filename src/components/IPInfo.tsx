import React, { useEffect, useState } from 'react'

function IPInfo() {
  const [ipData, setIpData] = useState({
    ip: '加载中...',
    continent: '加载中...',
    country: '加载中...',
    region: '加载中...',
    city: '加载中...',
    isp: '加载中...',
  })

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        setIpData({
          ip: data.ip || '未知',
          continent: data.continent_code || '未知',
          country: data.country_name || '未知',
          region: data.region || '未知',
          city: data.city || '未知',
          isp: data.org || '未知',
        })
      })
      .catch(() => {
        setIpData({
          ip: '获取失败',
          continent: '获取失败',
          country: '获取失败',
          region: '获取失败',
          city: '获取失败',
          isp: '获取失败',
        })
      })
  }, [])

  return (
    <table>
      <tr>
        <td>IP地址</td>
        <td>{ipData.ip}</td>
      </tr>
      <tr>
        <td>州/大陆</td>
        <td>{ipData.continent}</td>
      </tr>
      <tr>
        <td>国家</td>
        <td>{ipData.country}</td>
      </tr>
      <tr>
        <td>省份</td>
        <td>{ipData.region}</td>
      </tr>
      <tr>
        <td>城市</td>
        <td>{ipData.city}</td>
      </tr>
      <tr>
        <td>运营商</td>
        <td>{ipData.isp}</td>
      </tr>
    </table>
  )
}

export default IPInfo
