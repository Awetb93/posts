import React from 'react'
import Home from "./components/home"
import Header from "./utils/header";
import { Router } from "react-router-dom";
import {CssBaseline,StylesProvider} from "@material-ui/core"
import History from "./utils/history"
export default function App() {
    return (
        <StylesProvider injectFirst>
  <CssBaseline  >
             
<Home />
            <Router history={History}>
                <Header/>
            </Router>
            
    
            </CssBaseline>
        </StylesProvider>
          
            
       
    )
}
