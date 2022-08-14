import { useNavigate } from 'react-router-dom'

import { Button } from 'antd'

import styles from './style/index.module.less'
function Home(): JSX.Element {
  const navigate = useNavigate()
  const gotoPage = (path) => {
    navigate(path)
  }
  return (
    <div className={styles.home}>
      <Button type="primary" className={styles.item} onClick={() => gotoPage('teacher')}>
        老师登录
      </Button>
      <Button type="primary" className={styles.item} onClick={() => gotoPage('student')}>
        学生登录
      </Button>
    </div>
  )
}

export default Home
