import React from 'react'
import { GardenMotion } from './components/GardenMotion'
import ReactDOM from 'react-dom/client'
import '@fontsource/be-vietnam-pro/latin-400.css'
import '@fontsource/be-vietnam-pro/vietnamese-400.css'
import '@fontsource/be-vietnam-pro/latin-500.css'
import '@fontsource/be-vietnam-pro/vietnamese-500.css'
import '@fontsource/cormorant-garamond/latin-400.css'
import '@fontsource/cormorant-garamond/vietnamese-400.css'
import '@fontsource/cormorant-garamond/latin-500.css'
import '@fontsource/cormorant-garamond/vietnamese-500.css'
import App from './reading/Router'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><GardenMotion><App /></GardenMotion></React.StrictMode>)
import './styles/atmosphere.css'

import './styles/editorial-garden.css'

import './styles/living-garden.css'
