import {createRoot} from 'react-dom/client'
import {StrictMode} from "react";
import { Input } from './ui/Input/Input';
import { App } from './components';
import './index.module.scss';
import './index.scss'
const domNode = document.getElementById('root') as HTMLDivElement
const root = createRoot(domNode)


root.render(
  <StrictMode>
   <App/>
  </StrictMode>
)