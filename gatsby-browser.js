import 'prismjs/themes/prism-tomorrow.css';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import AppProvider from './src/context/app'

// Send all data Props to Search 
export const wrapRootElement = ({ element }) => {
    return <AppProvider>{element}</AppProvider>
  }

// Fix Icon Flash (FOUC)
config.autoAddCss = false;