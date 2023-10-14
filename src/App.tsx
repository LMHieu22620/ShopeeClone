import { ToastContainer } from 'react-toastify'
import useRouteElement from './useRouteElement'
import 'react-toastify/dist/ReactToastify.css'
import { LocalStorageEventarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import { useContext, useEffect } from 'react'

function App() {
  const routeElement = useRouteElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <div>
      {routeElement}
      <ToastContainer />
    </div>
  )
}

export default App
