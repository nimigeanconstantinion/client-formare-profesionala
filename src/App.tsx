import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home";
import 'primereact/resources/themes/saga-blue/theme.css';  // Sau orice altă temă
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Test from "./components/Test";
import TestGrdDinamic from "./components/TestGrdDinamic";
// import Drop, {AutoCompProps, Data} from "./components/SearchableDropDown/index2"
import MyAutoComplete,{Data} from "./components/SearchableDropDown/index_new";

import {Provider} from "react-redux";
import store from "./store/store";
import {AutoComplete} from "primereact/autocomplete";
import TestX from "./components/SearchableDropDown/test";
import TestEQ from "../src/components/TestObjectEquality/index"
import EditableDemo from "./components/SearchableDropDown/index_simple";
import SimpleDropDown from "./components/SearchableDropDown/index_simple";
import TestCompDinamic from "./components/TestCompDynamic/index"
import TestAddAutocomp from "./components/SearchableDropDown/index_add"



const ob=[
    {dataA: '2024-01-01',nume:'jjaljlj'},
    {dataA: '2023-01-01',nume:'wen oekeow'}
];

const dt:Data[]=[
    { name: 'Afghanistan', code: 'AF',fields:["dataA"],load: ob[0]},
    { name: 'Albania', code: 'AL',fields:["dataA"],load: ob[1]}
]



function App() {

  return (
     <Provider store={store}>


         <div className="App">
             <header className="App-header">
                 <BrowserRouter basename={"/ux"}>
                     <Routes>
                         <Route path={"/"} element={<Home/>}/>
                         <Route path={"/test"} element={<Test/>}/>
                         <Route path={"/testg"} element={<TestGrdDinamic/>}/>
                         <Route path={"/drop"} element={<TestX/>}/>

                         <Route path={"/testeq"} element={<TestEQ/>}/>
                         <Route path={"/testcomp"} element={<TestCompDinamic comp={2}/>}/>
                         <Route path={"/testnume"} element={<TestAddAutocomp/>}/>

                         {/*<Route path={"/tests"} element={<SimpleDropDown data={[*/}
                         {/*    { name: 'New York', code: 'NY',load: null },*/}
                         {/*    { name: 'Rome', code: 'RM',load: null },*/}
                         {/*    { name: 'London', code: 'LDN',load: null },*/}
                         {/*    { name: 'Istanbul', code: 'IST' ,load: null},*/}
                         {/*    { name: 'Paris', code: 'PRS',load: null }*/}
                         {/*]} defaultObj={null} returnFunction={null}/>}/>*/}

                     </Routes>
                 </BrowserRouter>

             </header>
         </div>


     </Provider>

  );
}

export default App;
