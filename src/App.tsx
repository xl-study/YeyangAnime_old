import Header from './layout/Header'
import { ConfigProvider } from 'antd'
import './App.scss'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#f1b3be',
          colorPrimaryHover: '#ffc0cb',
          fontFamily: 'ZCOOL KuaiLe',
        },
      }}
    >
      <div className="app">
        <Header></Header>
      </div>
    </ConfigProvider>
  )
}

export default App
