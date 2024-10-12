import React, {useEffect, useRef, useState} from "react";
import {Cursant, Nume} from "../../models/Cursant";
import store from "../../store/store";
import Curs from "../../models/Objects";
import {Data, LoadType} from "../SearchableDropDown";
import CompNume from "../SearchableDropDown/index_add_nume"
import {WrapperCusant} from "./indexstyle";
import {CarteIdentitate} from "../../models/Persoana";
import CIComp from "../SearchableDropDown/autocomp_multifield_local_filter"
import AdresaComp from "../Adresa/index"
import DetaliiComp from "../DetaliiCursant/index"

import GrdRow from "../TestGrdDinamic/indexRow"
interface CursantProps{
    idCursant:number


}
const CursantComp:React.FC<CursantProps>=({idCursant})=>{

    const [crtCursant,setCrtCursant]=useState<Cursant>();
    const [crtCurs,setCrtCurs]=useState<Curs>();
    const [listaNume,setListaNume]=useState<Nume[]>([])
    const [listaCi,setListCI]=useState<Data[]>([]);
    const cursState=store.getState().cursState;
    const [crtNume,setCrtNume]=useState<Nume>();
    const [listCursanti,setListaCursanti]=useState<Cursant[]>();
    const [indexCrs,setIndexCrs]=useState<number>();
    const refCnp=useRef<HTMLInputElement>(null);;
    const refPrenume=useRef<HTMLInputElement>(null);;
    const refPrenumeTata=useRef<HTMLInputElement>(null);;
    const refPrenumeMama=useRef<HTMLInputElement>(null);;
    const refTara=useRef<HTMLInputElement>(null);;
    const refJudN=useRef<HTMLInputElement>(null);;
    const refLocN=useRef<HTMLInputElement>(null);;
    const refNrCI=useRef<HTMLInputElement>(null);

    const [ch,setCh]=useState(0);
    const [dataNume,setDataNume]=useState<Data[]>([]);
    const [defaNume,setDefaNume]=useState<Data>();
    const [defaCi,setDefaCi]=useState<Data>();

    useEffect(()=>{
        console.log("======= Incarc componenta "+idCursant);
        let crc=store.getState().cursState.cursCrt;
        if(crc){
            setCrtCurs(crc);

        }
    },[])


    useEffect(()=>{
        console.log("======= In Change "+idCursant)
        console.log(listaCi);

    },[ch])
    useEffect(()=>{
        console.log("======= Schimb cursantul cu "+idCursant)
        setListCI([]);
        setIndexCrs(idCursant);
        console.log(idCursant);
        if(cursState.cursCrt!=null&&cursState.cursCrt.cursantList.length>0){
            let lista=cursState.cursCrt!.cursantList.slice().sort((a,b)=>{
                let xc=a.nume.nume.localeCompare(b.nume.nume);
                if(xc==0){
                    return a.nume.prenume.localeCompare(b.nume.prenume)
                }
                return xc;
            });
            console.log(lista.map(a=>a.nume.nume+" "+a.nume.prenume));

            setListaCursanti(lista);



            let dataN:Data[]=[];
            let crp=lista[idCursant];
            crp.persoana.nume.map(a=>{
                dataN.push({
                name: a.nume,
                code: a.id.toString(),
                fields: ["prenume","dataAdd"],
                load:a})
                return;
            });

            setDataNume(dataN);

            setDefaNume({code: crp.nume.id.toString(),name: crp.nume.nume,fields:["prenume","dataAdd"],load: crp.nume as LoadType})


            if(lista[idCursant].persoana.carteIdentitateList){

                let listaC:Data[]=[];
                lista[idCursant].persoana.carteIdentitateList.map(c=>{
                    setListCI(prevState => [...prevState,{
                        code: c.id.toString(),
                        name: c.serie,
                        fields: ["numar","dataAdd"],
                        load: c as LoadType
                    }]);
                });

            }


            let cr=lista[idCursant]

            if(refCnp.current!=null&&crtCursant!=null&&refPrenume.current){
                refCnp.current.value=lista[idCursant].persoana.cnp;
                refPrenume.current.value=lista[idCursant].nume.prenume;

                if(refPrenumeTata.current) {
                    refPrenumeTata.current.value = lista[idCursant].persoana.prenumeTata;
                }
                if(refPrenumeMama.current) {
                    refPrenumeMama.current.value = lista[idCursant].persoana.prenumeMama;

                }
                if(refTara.current) {
                    refTara.current.value = lista[idCursant].persoana.taraNastere;
                }

                if(refJudN.current) {
                    refJudN.current.value = lista[idCursant].persoana.judetNastere;
                }

                if(refLocN.current) {
                    refLocN.current.value = lista[idCursant].persoana.localitateNastere;
                }
                if(refNrCI.current) {
                    refNrCI.current.value = lista[idCursant].persoana.carteIdentitateList[0].numar;
                }
            }
            console.log("==========================Inainte de setare defa CI")
            console.log(crtCurs);
            if(crtCurs?.dataStart){

                let tObj=retTargetObj(listaCi,crtCurs?.dataStart,"dataAdd");


                if(tObj!=null){
                    setDefaCi({
                        code: (tObj as Data).code,
                        name: (tObj as Data).name,
                        fields: ["numar","dataAdd"],
                        load: (tObj as Data).load
                    })
                }

            }

            setCrtCursant(lista[idCursant]);


            setCh(prevState => ++prevState);



        }

    },[idCursant])


    let retTargetObj=(lista:Object[],dref:Date,numecamp:string)=>{
        let indxO=Object.keys(lista[0]).indexOf("load");
        let obLoad:LoadType=Object.values(lista[0])[indxO];
        let indxCamp=Object.keys(obLoad).indexOf(numecamp);
        console.log("****************** Flag FUNCTIE____________________");
        console.log()
        console.log("Index camp="+indxCamp)
        console.log(Object.keys(lista[0]));
        console.log("****************** ____________________");

        if(indxCamp>=0){
            let listaSort=lista.slice().sort((a, b)=>{
                let aob=Object.values(a)[indxO] as LoadType;
                let bob=Object.values(b)[indxO] as LoadType;
                return (Object.values(aob)[indxCamp]).localeCompare(Object.values(aob)[indxCamp])


            }).reverse();

            let ob=listaSort.filter(a=>{
                let obL=Object.values(a)[indxO] as CarteIdentitate;
                // console.log(obL.dataAdd.getTime());
                // let adt=new Date(obL.dataAdd.toString())
                // let bdt=new Date(dref.toString());
                // console.log(adt.getTime())
                // console.log(bdt.getTime())
                return obL.dataAdd<=dref;
            })[0];

            console.log("######################   Am primit ")

            console.log(ob);
            console.log("######################   Am primit ")

            console.log(ob);

            if(ob){
                setDefaCi(ob as Data);
                return ob;
            }
        }
        return null;

    }
    let handleNumeSelect=(selNume:Data|undefined)=>{
        console.log("************ HANDLE SELECTION")
        console.log(selNume?.load)
        console.log(("______________________________"))

        if(selNume&&selNume.name&&selNume.name.includes("Add")){
            if(selNume.name.includes("Add")) {
                console.log("FLAG H1")


                console.log("Din Cursant _____--------------------")
                console.log(selNume);
                selNume.name = selNume.name.replace("Add ", "").trim();
                setDataNume(prevState => [...prevState, selNume]);
                setCh(prevState => ++prevState);
            }else{
                console.log("****************** FLAG H2 *********************")
                if(refPrenume.current){
                    let num:Nume|undefined=selNume.load as Nume;
                    if(num){
                        console.log("in schim prenume")

                        console.log(num.prenume)
                        refPrenume.current.value=num.prenume;
                        setCh(prevState => ++prevState);
                    }

                }

            }

        }else{
                if(selNume&&selNume.load&&refPrenume.current){

                    refPrenume.current.value=(selNume.load as Nume).prenume;
                    setCh(prevState => ++prevState);
                }


        }

    }



        return(
            <WrapperCusant>
                {
                    ch||crtCursant?(
                        <>
                            <div className={"divCurs1"}>
                                <div className={"csant pers"}>

                                    <div className={"p_fld cnp"}>
                                        <label className={"lblpers"} htmlFor={"pers_cnp"}>CNP</label>

                                        <input  ref={refCnp} type={"text"} id={"pers_cnp"} className={"search cnp"} defaultValue={crtCursant!=undefined?crtCursant.persoana.cnp:""}/>

                                    </div>


                                    <div className={"p_fld divnume"}>
                                        <label className={"lblpers"} htmlFor={"pers_nume"}>Nume</label>
                                        <div className={"search autocomp"} id={"pers_nume"}>
                                            <CompNume data={dataNume} defaultObj={defaNume} boolrw={true} retSelected={handleNumeSelect}/>

                                        </div>

                                    </div>

                                    <div className={"p_fld divpren"}>
                                        <label className={"lblpers"} htmlFor={"pers_pren"}>Prenume</label>

                                        <input  ref={refPrenume} type={"text"} className={"search prenume"} id={"pers_pren"} defaultValue={crtCursant!=undefined?crtCursant.nume.prenume:""}/>

                                    </div>

                                    <div className={"p_fld divtata"}>
                                        <label className={"lblpers"} htmlFor={"pers_tata"}>Prenume Tata</label>

                                        <input  ref={refPrenumeTata} type={"text"} className={"search tata"} id={"pers_tata"} defaultValue={crtCursant!=undefined?crtCursant.persoana.prenumeTata:""}/>

                                    </div>

                                    <div className={"p_fld divmama"}>
                                        <label className={"lblpers"} htmlFor={"pers_mama"}>Prenume Mama</label>

                                        <input  ref={refPrenumeMama} type={"text"} className={"search mama"} id={"pers_mama"} defaultValue={crtCursant!=undefined?crtCursant.persoana.prenumeMama:""}/>

                                    </div>

                                </div>

                            </div>

                            <div className={"divCurs2"}>

                                <div className={"p_fld divtara"}>
                                    <label className={"lbltara"} htmlFor={"pers_tara"}>Tara Nastere</label>

                                    <input  ref={refTara} type={"text"} className={"search mama"} id={"pers_mama"} defaultValue={crtCursant!=undefined?crtCursant.persoana.taraNastere:""}/>

                                </div>

                                <div className={"p_fld divJudN"}>
                                    <label className={"lbljudn"} htmlFor={"pers_judn"}>Judet Nastere</label>

                                    <input  ref={refJudN} type={"text"} className={"search judn"} id={"pers_judn"} defaultValue={crtCursant!=undefined?crtCursant.persoana.judetNastere:""}/>

                                </div>


                                <div className={"p_fld divLocN"}>
                                    <label className={"lbllocn"} htmlFor={"pers_locn"}>Localitate Nastere</label>

                                    <input  ref={refLocN} type={"text"} className={"search locn"} id={"pers_locn"} defaultValue={crtCursant!=undefined?crtCursant.persoana.localitateNastere:""}/>

                                </div>

                                <div className={"p_fld divCIS"}>
                                    <label className={"lblCi"} htmlFor={"pers_ci"}>Serie CI</label>

                                    {/*{*/}
                                    {/*    listaCi!=undefined?(*/}
                                            <div className={"search autocomp"} id={"pers_ci"}>
                                                <CIComp data={listaCi} defaultObj={defaCi} boolrw={false} />

                                            </div>


                                    {/*    ):""*/}
                                    {/*}*/}

                                </div>
                                <div className={"p_fld divCIN"}>
                                    <label className={"lblCi"} htmlFor={"pers_cin"}>Numar CI</label>

                                    <input  ref={refNrCI} type={"text"} className={"search cin"} id={"pers_cin"} defaultValue={crtCursant!=undefined?crtCursant.persoana.carteIdentitateList[0].numar:""}/>

                                </div>


                            </div>



                            <div className={"divCurs3"}>
                                <AdresaComp persoana={crtCursant?.persoana}/>

                            </div>

                            <div className={"divCurs4"}>
                                <DetaliiComp crtCursant={crtCursant}/>

                            </div>

                        </>





                    ):""



                }


            </WrapperCusant>


    )
}

export default CursantComp;