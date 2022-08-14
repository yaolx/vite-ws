import { useEffect, useState } from 'react'

import { useWebSocket } from 'ahooks'
import { message } from 'antd'
import { map, difference, isEmpty } from 'lodash'

import { getStudentList, addStudent, deleteStudent } from '@/api/app-api'
import { getRandomInt } from '@/utils/math-utils'

import styles from './style/index.module.less'
const config = import.meta.env
const stus = ['A', 'B', 'C', 'D', 'E', 'F']
function Student(): JSX.Element {
  const { latestMessage } = useWebSocket(config.VITE_WEBSOCKETURL)
  const [list, setList] = useState<Student[]>([])
  const onSearch = async () => {
    const data = await getStudentList()
    setList(data)
  }
  // 新增学生
  const onAdd = async () => {
    const curStus = map(list, (item) => item.name.at(item.name.length - 1))
    const otherStus = difference(stus, curStus)
    if (isEmpty(otherStus)) {
      message.success('添加学生人数已达上限')
      return
    }
    const data = await addStudent({
      name: '学生' + otherStus[getRandomInt(0, otherStus.length - 1)]
    })
    if (data.id) {
      message.success('新增成功')
      onSearch()
    }
  }
  // 删除学生
  const onDelete = async (id: number) => {
    await deleteStudent(id)
    onSearch()
  }
  console.log('latestMessage', latestMessage)
  return (
    <div className={styles.student}>
      <div>接收到的消息</div>
      <div>{latestMessage?.data}</div>
    </div>
  )
}

export default Student
