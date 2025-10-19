import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import messageReducer from './reducers/messageReducer'

const store = createStore(messageReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
