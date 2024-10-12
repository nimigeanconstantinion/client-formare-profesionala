import * as React from 'react';
import {Menu} from "primereact/menu";
import MenuGeneral from "../MenuGeneral";
import {WrapperHome} from "./indexstyle";
import {LegacyRef, MutableRefObject, SyntheticEvent, useEffect, useRef, useState} from "react";
import Api from "../../Api";
import Persoana from "../../models/Persoana";
import Curs from "../../models/Objects";
import CursDiv from "../CursDiv"
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useDispatch, useSelector } from 'react-redux'

// import type { RootState, AppDispatch } from '../../store/store'
import {selLoadPersoanaCrt} from "../../store/persoana/persoana.selector";
import {loadPersoanaCrt} from "../../store/persoana/persoana.reducer";
import {loadCursCrt,initCursState} from "../../store/curs/curs.reducer";
import store from "../../store/store";
import DatePicker from "react-date-picker";
// import { useAppSelector, useAppDispatch } from '../../store/hooks'
import {Value} from "react-date-picker/dist/cjs/shared/types";
import Cursant from "../Cursant/index"
export default function Home() {

    const [pers,setPers]=useState<Persoana>();
    const [crtCurs,setCrtCurs]=useState<Curs|null>();
    const [menuOpt,setMenuOpt]=useState("");
    const [first, setFirst] = useState<number>(0);
    const [isVisibledet, setIsVisibledet] = useState(false); // Initial visibility state
    const [isVisibledetCursanti, setIsVisibledetCursanti] = useState(false); // Initial visibility state
     const [mainContent,setMainContent]=useState<HTMLElement>();
    // const mainRef=useRef<MutableRefObject<LegacyRef<HTMLElement> | undefined>>();
    const [changed,setChanged]=useState(0);
    const mainRef = useRef<HTMLElement>(null);
    const [nrCurs,setNrCurs]=useState<number>();
    const refCurs=useRef<HTMLInputElement>(null);
    // const persState = useAppSelector((state) => state.persoanaState)
    // const dispatch = useAppDispatch()
    const dispatch = useDispatch();
    const [valDataSt,setValDataSt]=useState<Value>();
    const [valDataSf,setValDataSf]=useState<Value>();
    const [valDataEx,setValDataEx]=useState<Value>();


    const [pageNr,setPageNr]=useState(0);

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
    };


    useEffect(()=>{

         let initElm=document.getElementsByTagName("main");
         // setMainContent(initElm);
         loadPers();
         // let elm=document.getElementById("mainID");
         // if(mainRef.current!=null&&elm!=null) {
         //     mainRef.current.innerHTML= elm.innerHTML;
         //     setMainContent(mainRef.current);
         // }
        // loadCurs();

    },[])
    let loadPers=async ()=>{
        let api=new Api();
        let response = await api.getPersByCnp("1650208335048");
        dispatch(loadPersoanaCrt(response));
        console.log(response);
        setPers(response);

    }

    let loadCurs=async ()=>{
        setCrtCurs(undefined);
        let api=new Api();
        try{

            let response = await api.getCursByNr(Number(nrCurs));
            dispatch(loadCursCrt(response));
            console.log(response);
            setCrtCurs(response);

            setValDataSt(crtCurs!.dataStart);
            setValDataSf(new Date(formatDateToStringManual(crtCurs!.dataSfarsit)));
            setValDataEx(new Date(formatDateToStringManual(crtCurs!.dataExamen)));
            setChanged(prevState => ++prevState);

        }catch (e){
            console.log("N-am extras cursul");

        }

        // setPers(response);

    }


  async function clearContent(elements: HTMLCollectionOf<HTMLElement>) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = '';
        }
    }

    let menuFunc=async (opt:string)=>{
        console.log("Ati ales "+opt);



        dispatch(initCursState());
        setCrtCurs(store.getState().cursState.cursCrt);
        setNrCurs(undefined);
        setMenuOpt("");
        // setChanged(prevState => prevState+=1);

        setMenuOpt(opt);
        let elm=document.getElementById("search_nrcurs");
        if(elm!=null){
            elm.innerHTML="";
            if(refCurs.current!=null){
                refCurs.current.value="";

            }
        }
        console.log(changed);
        setChanged(prevState => prevState+=1);

       // console.log(store.getState().cursState.cursCrt)
        // setCrtCurs(store.getState)
        // setMainContent(elm);

    }

    useEffect(()=>{
     // console.log(mainContent);
    },[menuOpt])

    const toggleVisibility = () => setIsVisibledet(!isVisibledet); // Function to toggle state

    const toggleVisibilityCursanti = () => setIsVisibledetCursanti(!isVisibledetCursanti); // Function to toggle state


    let getName=(indx:number):string=>{

        let numes=crtCurs?.cursantList[indx].persoana.nume.sort();
        if(numes!=undefined&&numes!.length>0&&numes[numes!.length-1].nume!=undefined){
            return numes[numes.length-1].nume;
        }
        return "";
    }

    let formatDateToStringManual=(date: Date): string=> {
        // console.log("Data e="+date);
        let dts=date.toString();
        console.log(dts.substring(1,10));
        return dts.substring(0,10).trim();
        // let yy=date.getFullYear();
        // let mm=date.getMonth()+1;
        // let zz=date.getDay();
        // console.log("data="+zz+"/"+mm+"/"+yy);

        // const year = yr.toString().padStart(4, '0');
        // const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        // const day = date.getDate().toString().padStart(2, '0');

    }

    let handleDstchange=(e:Value)=>{
            setValDataSt(e);
    }
    let handleDsfchange=(e:Value)=>{
        setValDataSf(e);
    }

    let handleDExchange=(e:Value)=>{
        setValDataEx(e);
    }

    return(
            <WrapperHome>
                    <header className={"header"}>
                        <span>UI Formare Profesionala 1.01</span>

                    </header>

                    <aside className={"aside"}>
                        <MenuGeneral backFunc={menuFunc} />
                    </aside>
                {
                    changed?(
                        <>

                            <main ref={mainRef} className={"main"} id={"mainID"}>
                                {


                                    menuOpt=="cursuri.addmod"?(

                                        <>
                                            <div className={"headCurs"}>
                                                <div className={"camp divnrcurs"}>
                                                    <label htmlFor="search_nrcurs">Nr Curs</label>
                                                    <input  ref={refCurs} type={"text"} className="search nrCurs" id="search_nrcurs"
                                                           placeholder="Numar Curs" onChange={(e)=>setNrCurs(Number(Number(e.target.value)))}/>
                                                </div>
                                                <i className="pi pi-search srch" onClick={loadCurs} title="Cauta curs!!"/>
                                                {

                                                    crtCurs!=null&&valDataSt?(
                                                        // <div className={"divDenCurs"}>
                                                        //     {crtCurs.nomenclator.denumire}
                                                        // </div>
                                                        <>
                                                            <div className={"camp divDenCurs"}>
                                                                <label htmlFor="search_denCurs">Denumire Calificare/Ocupatie</label>

                                                                <input type={"text"} className="search denCurs" id="search_denCurs"
                                                                       value={crtCurs.nomenclator.denumire.trim()} readOnly={true} />

                                                            </div>

                                                            <div className={"camp divDst"}>
                                                                <label htmlFor="search_dataSt">Data Start</label>
                                                                <DatePicker  id="search_dataSt"  className={"search dataStart"} value={valDataSt} onChange={(e)=>handleDstchange(e)} locale={"en-GB"} format={"dd/MM/yyyy"} disabled={true}/>

                                                                {/*<input type={"date"} className={"search dataStart"} id={"search_dataSt"} value={`${formatDateToStringManual(crtCurs.dataStart)}`} readOnly={false}/>*/}

                                                            </div>
                                                            <div className={"camp divDsf"}>
                                                                <label htmlFor="search_dataSf">Data Sfărșit</label>
                                                                <DatePicker  id="search_dataSf"  className={"search dataSfarsit"} value={valDataSf} onChange={(e)=>handleDsfchange(e)} locale={"en-GB"} format={"dd/MM/yyyy"} disabled={true}/>

                                                                {/*<input type={"date"} className={"search dataSfarsit"} id={"search_dataSf"} value={`${formatDateToStringManual(crtCurs.dataSfarsit)}`} readOnly={true}/>*/}

                                                            </div>
                                                            <div className={"camp divDex"}>
                                                                <label htmlFor="search_dataEx">Data Examen</label>

                                                                {/*<input type={"date"} className={"search dataEx"} id={"search_dataEx"} value={`${formatDateToStringManual(crtCurs.dataExamen)}`} readOnly={true}/>*/}
                                                                <DatePicker  id="search_dataEx"  className={"search dataEx"} value={valDataEx} onChange={(e)=>handleDExchange(e)} locale={"en-GB"} format={"dd/MM/yyyy"} disabled={true}/>

                                                            </div>

                                                            <div className={"camp divTipCurs"}>
                                                                <label htmlFor="search_tipCurs">Tip Curs</label>

                                                                <input type={"text"} className="search tipCurs" id="search_tipCurs"
                                                                       value={crtCurs.tipCurs.valueOf()} readOnly={true} />
                                                            </div>


                                                        </>

                                                    ):""

                                                }
                                                {

                                                    !isVisibledet?(
                                                        <div className={"expand expcurs"}>
                                                            <i className={"pi pi-chevron-right showdet"}  onClick={toggleVisibility}/>

                                                        </div>

                                                    ):(
                                                        <div className={"expand expcurs"}>

                                                            <i className={"pi pi-chevron-down showdet"}  onClick={toggleVisibility}/>

                                                        </div>
                                                    )


                                                }

                                                {
                                                    !isVisibledetCursanti?(
                                                        <div className={"expand expcrs"}>
                                                            <i className={"pi pi-plus showdetcrs"}  onClick={toggleVisibilityCursanti}/>

                                                        </div>
                                                    ):(
                                                        <div className={"expand expcrs"}>
                                                            <i className={"pi pi-minus showdetcrs"}  onClick={toggleVisibilityCursanti}/>

                                                        </div>
                                                    )
                                                }

                                            </div>
                                            {
                                                crtCurs?.cursantList&&isVisibledet?(
                                                    <div className={"divdetcurs"}>
                                                        <div className={"camp divDet"}>
                                                            {/*<label htmlFor="det_autoriz">Autorizatie </label>*/}

                                                            {/*<input type={"text"} className={"det autoriz"} id={"det_autoriz"} value={crtCurs.autorizatie.nrAutorizatie} readOnly={true}/>*/}
                                                            <CursDiv curs={crtCurs}/>
                                                        </div>

                                                    </div>
                                                ):""


                                            }
                                            {
                                                crtCurs?.cursantList&&isVisibledetCursanti&&first!=undefined?(
                                                    <div className="card">
                                                        <Paginator first={first} rows={1} totalRecords={crtCurs.cursantList.length} onPageChange={onPageChange}
                                                                   template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" />

                                                        <div className="p-3 text-center">
                                                            {/*< className="shadow-2 border-round max-w-full" />*/}
                                                            {
                                                                first!=undefined?(
                                                                            <>
                                                                                <Cursant idCursant={first!=undefined?first:0}/>
                                                                            </>


                                                                    ):""


                                                                    //
                                                                    // {/*<div className={"camp divCnp"}>*/}
                                                                    // {/*    <label htmlFor="cnp">Denumire Calificare/Ocupatie</label>*/}
                                                                    //
                                                                    // {/*    <input type={"text"} id={"cnp"} value={crtCurs.cursantList[first].persoana.cnp}/>*/}
                                                                    // {/*</div>*/}
                                                                    // {/*<p>{getName(first)}</p>*/}
                                                                    //

                                                            }
                                                        </div>
                                                    </div>
                                                ):""
                                            }
                                        </>

                                    ):""
                                }

                            </main>
                        </>
                    ):""


                }

                    <footer className={"footer"}>
                        <span>
                            Test Ui 2024

                        </span>
                    </footer>
            </WrapperHome>
    )
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
