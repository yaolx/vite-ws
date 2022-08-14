import { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'

import { Provider } from 'mobx-react'
import ReactDom from 'react-dom/client'
import VConsole from 'vconsole'

import Router from '@/routes'
import globalStore from '@/store/global'
import './index.less'

new VConsole()
const stores = {
  globalStore
}
const rootElement = document.getElementById('root') as Element | DocumentFragment
const root = ReactDom.createRoot(rootElement)
root.render(
  <Provider stores={stores}>
    <Suspense>
      <HashRouter>
        <Router />
      </HashRouter>
    </Suspense>
  </Provider>
)
