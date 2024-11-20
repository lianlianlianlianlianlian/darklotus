// src/components/UserAgent.tsx

import React, { useEffect, useState } from 'react'

const UserAgent: React.FC = () => {
  const [userAgent, setUserAgent] = useState<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserAgent(navigator.userAgent)
    }
  }, [])

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <tbody>
        <tr>
          <td style={{ padding: '10px', fontWeight: 'bold', border: '1px solid #333' }}>设备</td>
          <td style={{ padding: '10px', border: '1px solid #333' }}>{userAgent || '未能获取设备信息'}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default UserAgent
