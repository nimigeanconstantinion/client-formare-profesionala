import Curs, {Autorizatie, TipCertificat, TipCurs, TipFurnizor} from "../../models/Objects";
import MyAutoComplete, {LoadType} from "../SearchableDropDown/index";
import {useEffect, useState} from "react";
import {Data} from "../SearchableDropDown/index";
// import { Calendar } from 'primereact/calendar';

import Api from "../../Api";
import * as React from "react";
import {WrapperCurs} from "./indexstyle";
import SimpleDropDown, {DataSimple} from "../SearchableDropDown/index_simple";
import Simpl from "../SearchableDropDown/index_simple";

import CarteIdentitate from "../SearchableDropDown/index_simple"

import DatePicker from "react-date-picker";
import {Value} from "react-date-picker/dist/cjs/shared/types";
interface CursProps {
    curs: Curs
}


const CursPannel: React.FC<CursProps> = (data) => {

    // const [lista,setList]=useState<Date[]>([]);
    const [listaAutoriz, setListaAutoriz] = useState<Autorizatie[]>([]);
    const [listaAutoCompl, setListaAutoCompl] = useState<Data[]>([]);
    const [arrayDataCI,setArrayDataCI]=useState<Data[]>([]);

    const [defaulAut, setDefaultAut] = useState<Data>();
    const [indxDefa, setIndxDefa] = useState<number>();
    const [nrAut, setNrAut] = useState("");
    const [dataAut, setDataAut] = useState<Value>();
    const [tipAut, setTipAut] = useState("");
    const [dataDisp, setDataDisp] = useState<Value>();
    const [dataPV, setDataPV] = useState<Value>();

    const [tipuriCurs,setTipuriCurs]=useState<DataSimple[]>([]);

    const [defaTipCurs,setDefaTipCurs]=useState<DataSimple>();

    const [tipuriFurnizor,setTipuriFurnizor]=useState<DataSimple[]>([]);
    const [defaTipFurn,setDefaTipFurn]=useState<DataSimple>();

    const [tipuriCert,setTipurCert]=useState<DataSimple[]>([]);
    const [defaTipCert,setDefaTipCert]=useState<DataSimple>();
    const [focusDate,setFocusDate]=useState("");



    function castContent(dateStr: string): string {
        // Parse the date string into a Date object
        const date = new Date(dateStr);
        let formattedDate: string = "";
        if (date != null) {

            // Format the date object into the desired format (MM/DD/YYYY)
            formattedDate = date.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
        } else {
            formattedDate = dateStr;
        }
        return formattedDate;
    }

    useEffect(() => {
        let lst: Data[] = [];
        console.log("------------ FLAAAAAAAAAAG")
        // loadTipFurn();
        // setDataPV(data.curs.dataProcesVerbalExamen!=null?formatDateToStringManual(data.curs.dataProcesVerbalExamen):formatDateToStringManual(""))
        loadTipCurs();
        loadAutoriz().then(a => a != undefined ? setListaAutoriz(a) : "");
        let da = data.curs!.dataDisp;
        if (da != undefined) {
            setDataDisp(data.curs!.dataDisp);

        }
        let dp = data.curs!.dataProcesVerbalExamen;
        if (dp != undefined) {
            setDataPV(dp);

        }

        // setChanged(prevState => prevState++);
    }, [])

    useEffect(() => {
        console.log("Am schimbat lista")
        listaAutoriz.map(z => {
            setListaAutoCompl(prevState => [...prevState, {
                name: z.nomenclator.denumire,
                code: z.nrAutorizatie,
                load: z,
                fields: ['dataRNFPA']
            }])
        })
        console.log(listaAutoCompl);

    }, [listaAutoriz])

    let retSelAutoriz = (a: Autorizatie | null) => {
        if (a != null) {
            console.log(a.nomenclator.denumire)
            setNrAut(a.nrAutorizatie);
            console.log("Data autorizatiei=");
            setDataAut(new Date(a.dataAutorizatie));
            setTipAut(a.tipCurs);
            // setDataAut(castContent(a.dataAutorizatie.toLocaleDateString()));
        }

    }

    let formatDateToStringManual = (date: Date): string => {
        // console.log("Data e="+date);
        let dts = date.toString();
        console.log(dts.substring(1, 10));
        if(dts){
        return dts.substring(0, 10).trim();
        }else{
            return "";
        }
        // let yy=date.getFullYear();
        // let mm=date.getMonth()+1;
        // let zz=date.getDay();
        // console.log("data="+zz+"/"+mm+"/"+yy);

        // const year = yr.toString().padStart(4, '0');
        // const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        // const day = date.getDate().toString().padStart(2, '0');

    }


    let retDefaultAut = () => {
        let idDefaultAut = data.curs.autorizatie.id;
    }
    let loadAutoriz = async (): Promise<Autorizatie[]> => {
        let api = new Api();
        try {
            let response = await api.getAutorizatii(null);
            console.log("Autorizatii");
            console.log(response);

            if (data.curs.autorizatie != undefined && data.curs.autorizatie != null) {
                setIndxDefa(data.curs.autorizatie.id);
                setNrAut(data.curs.autorizatie.nrAutorizatie);
                setTipAut(data.curs.autorizatie.tipCurs);
                // setDataAut(data.curs.autorizatie != null ? castContent(data.curs.autorizatie.dataAutorizatie.toString()) : "");
               setDataAut(new Date(data.curs.autorizatie.dataAutorizatie));
                let autt: Data = {
                    name: data.curs.autorizatie.nomenclator.denumire,
                    code: data.curs.autorizatie.nrAutorizatie,
                    load: data.curs.autorizatie,
                    fields: ["dataRNFPA"]

                }
                setDefaultAut(autt);

            } else {
                setDefaultAut(undefined);
            }

            return response;
        } catch (e) {
            console.log("EROAREEEEEEEEEEEEEEEE")
            throw e;
        }
    }

    let loadTipCurs=()=>{
        console.log("============================= in loadTipCurs");
        console.log(data.curs.tipCurs);
        let tipuri=Object.keys(TipCurs);

        let tp=tipuri.map((v,index)=>{
            let sd:DataSimple={
                name: v,
                code: index.toString(),
                load: null

            }
            return sd
        })

        if(data.curs.autorizatie!=null) {
            let ob: DataSimple = tp.filter(a => a.name === data.curs.autorizatie.tipCurs)[0];
            if(ob!=null){
                setDefaTipCurs(ob);

            }else{
                setDefaTipCurs(undefined);

            }
        }
        setTipuriCurs(tp);


        console.log("============================= in loadTipFurniz");
        // console.log(data.curs.tipFurnizor);

        let tips=Object.keys(TipFurnizor);

        let tps= tips.map((v,index)=>{
            let ssd:DataSimple={
                name: v,
                code: index.toString(),
                load: null

            }


            return ssd
        });


        console.log("Tps=");
        let obT: DataSimple = tps.filter(a => a.name === data.curs.tipFurnizor)[0];

        if(obT!=null){
            setDefaTipFurn(obT);

        }else{
            setDefaTipFurn(undefined);

        }
        console.log(defaTipFurn);
        setTipuriFurnizor(tps);
        // tp.filter(v=>v.name==data.curs.autorizatie.tipCurs)[0].name

        console.log("============================= in loadTipCertif");
        // console.log(data.curs.tipFurnizor);

        tips=Object.keys(TipCertificat);

        let tpC= tips.map((v,index)=>{
            let ssd:DataSimple={
                name: v,
                code: index.toString(),
                load: null

            }


            return ssd
        });


        console.log("Tps=");
        let obC: DataSimple = tpC.filter(a => a.name === data.curs.tipCertificat)[0];

        if(obC!=null){
            console.log("---------- SETAT -----------------------------")
            setDefaTipCert(obC);

        }else{
            setDefaTipCert(undefined);

        }
        console.log(defaTipFurn);
        setTipurCert(tpC);


    }

    // let loadTipFurn=async ()=>{
    //     console.log("============================= in loadTipFurniz");
    //     // console.log(data.curs.tipFurnizor);
    //
    //     let tips=Object.keys(TipFurnizor);
    //
    //     let tps=await tips.map((v,index)=>{
    //         let ssd:DataSimple={
    //             name: v,
    //             code: index.toString(),
    //             load: null
    //
    //         }
    //
    //         if(v==data.curs.tipFurnizor.trim()){
    //             setDefaTipFurn(ssd)
    //         }
    //         return ssd
    //     });
    //
    //     console.log(defaTipFurn);
    //     setTipuriFurnizor(tps);
    //     // tp.filter(v=>v.name==data.curs.autorizatie.tipCurs)[0].name
    // }
    let loadAutorizByName = async (): Promise<Data[]> => {
        let api = new Api();
        try {
            let response = await api.getAutorizatii(null);
            console.log("Autorizatii");
            console.log(response);
            let lst: Data[] = response.map(r => {
                return {
                    name: r.nomenclator.denumire,
                    code: r.nrAutorizatie,
                    load: r,
                    fields: ["dataRNFPA"]
                }
            })
            return lst;
        } catch (e) {
            console.log("EROAREEEEEEEEEEEEEEEE")
            throw e;
        }
    }

    let filterAutorizatie = async (flt: string | null): Promise<Data[]> => {


        let api = new Api();

        try {

            if (flt != null && flt.includes("/")) {
                return listaAutoCompl;
            } else {

                let response = await api.getAutorizatii(flt);
                console.log("Autorizatii filtrate")
                console.log(response);
                return response.map(a => {
                    // let aldt=a as LoadType;
                    let dt: Data =
                        {
                            name: a.nomenclator.denumire,
                            code: a.nrAutorizatie,
                            load: a as Autorizatie,
                            fields: ["dataRNFPA"]
                        };
                    return dt;

                });
            }
        } catch (e) {
            console.log("EROAREEEEEEEEEEEEEEEE");
            throw e;

        }

    }

    let handleDataAutChange=(e:Value)=>{
        if(focusDate=="autorizatie"){
            setDataAut(e);

        }
    }

    return (

        <WrapperCurs>
            {
                listaAutoCompl.length > 0 || defaulAut ? (
                    <div className={"containerAutorizatii"}>
                        <div className={"camp divAutoriz"}>
                            <label className={"lbl"} htmlFor="search_denAutoriz">Denumire Autorizatie</label>

                            <div id={"search_denAutoriz"} className={"search denAutoriz"}>
                                <MyAutoComplete  data={listaAutoCompl} retSelected={retSelAutoriz}
                                                filterFunc={filterAutorizatie} defaultObj={defaulAut} boolrw={true}/>

                            </div>


                        </div>

                        <div className={"camp divNrAutoriz"}>
                            <label className={"lbl"} htmlFor="search_nrAutoriz">Nr Autorizatie</label>


                            <input type={"text"} className="search nrAutoriz" id="search_nrAutoriz"
                                   value={nrAut} readOnly={true}/>
                        </div>


                        <div className={"camp divDataAut"}>
                            <label className={"lbl"} htmlFor="search_dataAut">Data Autorizatie</label>


                            {/*<DatePicker  id="search_dataAut"  className={"search dataAut"} value={dataAut} onChange={(e)=>handleDataAutChange(e)} locale={"en-GB"} format={"dd/MM/yyyy"} disabled={true}/>*/}

                            <DatePicker id={"search_dataAut"} className={"search datAut"} value={dataAut} onFocus={(e)=>setFocusDate("autorizatie")}
                                        onChange={(e)=>handleDataAutChange(e)} format={"dd/MM/yyyy"} />
                            {/*<input type={"text"} className="search dataAut" id="search_dataAut"*/}
                            {/*       value={dataAut} readOnly={true}/>*/}
                        </div>

                        <div className={"camp divTip"}>
                            <label className={"lbl"} htmlFor="search_tipAut">Tip Program</label>


                            {/*<input type={"text"} className="search tipAut" id="search_tipAut"*/}
                            {/*       value={tipAut} readOnly={true}/>*/}
                            <div className={"search divTip"} id={"search_tipAut"}>

                                <SimpleDropDown  data={tipuriCurs} defaultObj={defaTipCurs!} returnFunction={null} isrw={true}/>

                            </div>
                        </div>
                    </div>) : (
                    ""
                )

            }
            <div className={"divInfo"}>

                <div className={"camp divDisp"}>
                    <label className={"lbl"} htmlFor="search_disp">Nr dispozitie</label>


                    <input type={"text"} className="search disp" id="search_disp"
                           value={data.curs.nrDispozitie} readOnly={true}/>
                </div>
                <div className={"camp divDisp"}>
                    <label className={"lbl"} htmlFor="search_dataDisp">Data Dispozitie</label>


                    {/*<input type={"date"} className={"search dataDisp"} id={"search_dataDisp"}*/}
                    {/*       value={dataDisp} readOnly={true}/>*/}
                    <DatePicker id={"search_dataDisp"} className={"search datDisp"} value={dataDisp} onChange={(e)=>handleDataAutChange(e)} format={"dd/MM/yyyy"} onFocus={(e)=>setFocusDate("dispozitie")}/>


                    {/*<input type={"text"} className="search dataDisp" id="search_dataDisp"*/}
                    {/*       value={dataDisp} readOnly={true} />*/}
                </div>
                {/*<div className={"camp divCFOrg"}>*/}
                {/*    <label className={"lbl"} htmlFor="search_cforg">CUI Organizator</label>*/}


                {/*    <input type={"text"} className="search cforg" id="search_cforg"*/}
                {/*           value={data.curs.furnizor.codFiscal?data.curs.furnizor.codFiscal:data.curs.codFiscalOrg} readOnly={true}/>*/}
                {/*</div>*/}

                {/*<div className={"camp divOrg"}>*/}
                {/*    <label className={"lbl"} htmlFor="search_org">Organizator</label>*/}


                {/*    <input type={"text"} className="search org" id="search_org"*/}
                {/*           value={data.curs.furnizor.denumire?data.curs.furnizor.denumire:data.curs.organizator} readOnly={true}/>*/}
                {/*</div>*/}

                <div className={"camp divOreT"}>
                    <label className={"lbl"} htmlFor="search_oreT">Ore Teorie</label>


                    <input type={"text"} className="search oreT" id="search_oreT"
                           value={data.curs.oreTeorie} readOnly={true}/>
                </div>

                <div className={"camp divOreP"}>
                    <label className={"lbl"} htmlFor="search_oreP">Ore Practica</label>


                    <input type={"text"} className="search oreP" id="search_oreP"
                           value={data.curs.orePractica} readOnly={true}/>
                </div>
                <div className={"camp divOreTot"}>
                    <label className={"lbl"} htmlFor="search_oreTot">Ore Total</label>


                    <input type={"text"} className="search oreP" id="search_oreTor"
                           value={data.curs.oreTotal} readOnly={true}/>
                </div>

            </div>

            <div className={"divInfo div2"}>

                <div className={"camp divCertif"}>
                    <label  className={"lbl"} htmlFor="search_tipCert">Tip Certificat</label>

                    {/*<input type={"text"} className="search tipFurniz" id="search_tipFurniz"*/}
                    {/*       value={data.curs.tipFurnizor} readOnly={true} />*/}



                    {
                        tipuriCert.length>0?(
                            <div className={"search divTipCertif"} id={"search_tipCertif"} >

                                <Simpl  data={tipuriCert} defaultObj={defaTipCert} returnFunction={null} isrw={false}/>

                            </div>
                        ):""
                    }

                </div>

                <div className={"camp divOrg"}>
                    <label className={"lbl"} htmlFor="search_org">Organizator</label>


                    <input type={"text"} className="search org" id="search_org"
                           value={data.curs.furnizor!=null?data.curs.furnizor.denumire:data.curs.organizator} readOnly={true}/>
                </div>

                <div className={"camp divCFOrg"}>
                    <label className={"lbl"} htmlFor="search_cforg">CUI Organizator</label>


                    <input type={"text"} className="search cforg" id="search_cforg"
                           value={data.curs.furnizor!=null?data.curs.furnizor.codFiscal:data.curs.codFiscalOrg} readOnly={true}/>
                </div>

                <div className={"camp divTipFurniz"}>
                    <label  className={"lbl"} htmlFor="search_tipFurniz">Tip Furniz</label>

                    {/*<input type={"text"} className="search tipFurniz" id="search_tipFurniz"*/}
                    {/*       value={data.curs.tipFurnizor} readOnly={true} />*/}



                    {
                        tipuriFurnizor.length>0?(
                            <div className={"search divTipFurniz"} id={"search_tipFurniz"} >

                                <Simpl  data={tipuriFurnizor} defaultObj={defaTipFurn} returnFunction={null} isrw={true}/>

                            </div>
                        ):""
                    }

                </div>

                <div className={"divInfo div3"}>
                    <div className={"camp divResp"}>
                        <label className={"lbl"} htmlFor="search_resp">Responsabil</label>


                        <input type={"text"} className="search resp" id="search_resp"
                               value={data.curs.responsabil?data.curs.responsabil:""} readOnly={true}/>
                    </div>

                    <div className={"camp divPV"}>
                        <label className={"lbl"} htmlFor="search_nrpv">Nr PV Examen</label>


                        <input type={"text"} className="search pv" id="search_nrpv"
                               value={data.curs.nrProcesVerbalExamen} readOnly={true}/>
                    </div>

                    <div className={"camp divPV"}>
                        <label className={"lbl"} htmlFor="search_dataPV">Data PV</label>



                        <DatePicker id={"search_dataPV"} className={"search datPV"} value={dataPV} onChange={(e)=>handleDataAutChange(e)} format={"dd/MM/yyyy"} onFocus={(e)=>setFocusDate("PV")}/>

                        {/*<Calendar className={"search dataPV"} id={"search_dataPV"}  readOnlyInput={false}/>*/}
                            {/*input type={"date"} className={"search dataPV"} id={"search_dataPV"}*/}
                            {/*   value={dataPV} readOnly={false}/>*/}

                    </div>

                </div>



            </div>


        </WrapperCurs>
    )

}

export default CursPannel;