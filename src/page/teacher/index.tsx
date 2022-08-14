import { useEffect, useState } from 'react'

import { useWebSocket } from 'ahooks'
import { Layout, Button } from 'antd'
import { map } from 'lodash'

import { getStudentList } from '@/api/app-api'

import styles from './style/index.module.less'

const { Sider, Content } = Layout
const config = import.meta.env
function Student(): JSX.Element {
  const [list, setList] = useState<Student[]>([])
  const onSearch = async () => {
    const data = await getStudentList()
    setList(data)
  }
  const { sendMessage, connect, latestMessage } = useWebSocket(config.VITE_WEBSOCKETURL)
  useEffect(() => {
    onSearch()
  }, [])
  const onConnect = () => {
    connect && connect()
  }
  const onSendMessage = () => {
    const data = {
      data: {
        name: 'teacher',
        text: 'hello'
      },
      message: '发送消息'
    }
    sendMessage && sendMessage(JSON.stringify(data))
  }
  return (
    <Layout className={styles.teacher}>
      <Content className={styles.content}>
        画板
        <Button type="primary" onClick={onSendMessage}>
          发布
        </Button>
        <Button type="primary" onClick={onConnect}>
          连接
        </Button>
        <div>{latestMessage?.data}</div>
      </Content>
      <Sider className={styles.sider}>
        {map(list, (item) => {
          return (
            <div className={styles.item} key={item.id}>
              <div className={styles.name}>{item.name}</div>
            </div>
          )
        })}
      </Sider>
    </Layout>
  )
}

export default Student
