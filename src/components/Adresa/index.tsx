import Persoana, {MediuLocalitate} from "../../models/Persoana";
import React, {useEffect, useRef, useState} from "react";
import Api from "../../Api";
import SimpleTipLoca, {DataSimple} from "../SearchableDropDown/index_simple"
import {Data, LoadType} from "../SearchableDropDown";
import Simpl from "../SearchableDropDown/index_simple";

interface AdresaProps{
    persoana?: Persoana
}

 const Index:React.FC<AdresaProps>=({persoana})=>{
    const refLocaInf=useRef<any>(null);
    const refLocaSup=useRef<any>(null);
    const refJud=useRef<any>(null);
    const refBlCas=useRef<any>(null);
     const refStrada=useRef<any>(null);
     const refNrStrada=useRef<any>(null);
     const refSc=useRef<any>(null);
     const refEt=useRef<any>(null);
     const refAp=useRef<any>(null);
     const refTel=useRef<any>(null);
     const refEmail=useRef<any>(null);
     const refTipLoca=useRef<any>(null);

     const [tipLoca,setTipLoca]=useState<DataSimple[]>([]);

     const [defaTipLoca,setDefaTipLoca]=useState<DataSimple>();
    const [lsup,setLsup]=useState<string|null>();


    useEffect(()=>{
        let tipL=MediuLocalitate;
        console.log("^^^^^^^^^^^^^^^^^^^^^^^ in Useeffect adresa")
        setTipLoca([]);
        let listTip=Object.values(MediuLocalitate).slice().map((t,index)=>{
            let ds:DataSimple={name: t.valueOf(),code: index.toString(),load: null }
            return ds;

        });
        setTipLoca(listTip)
    },[])

    useEffect(()=>{
        if(persoana){


            refLocaInf.current.value=persoana.adresaList[0].locaInf;
            refJud.current.value=persoana.adresaList[0].judet;
            refBlCas.current.value=persoana.adresaList[0].blCasa;
            refStrada.current.value=persoana.adresaList[0].strada;
            refNrStrada.current.value=persoana.adresaList[0].nrStrada;
            refSc.current.value=persoana.adresaList[0].scara;
            refEt.current.value=persoana.adresaList[0].et;
            refAp.current.value=persoana.adresaList[0].ap;
            refTel.current.value=persoana.adresaList[0].tel;
            refEmail.current.value=persoana.adresaList[0].email;
            // refTipLoca.current.value=persoana.adresaList[0].mediuLocalitate;


            if(persoana.adresaList[0].localitate){
                let rsp:string|null="";
                getLocaSup(persoana.adresaList[0].localitate.siruta).then(r=>setLsup(r));



            }

            let iDt=Object.values(MediuLocalitate).indexOf(persoana.adresaList[0].mediuLocalitate);
            let dsm:DataSimple={
                code: iDt.toString(),
                name: Object.values(MediuLocalitate)[iDt],
                load: null
            }

            setDefaTipLoca(dsm);
            // setDefaTipLoca({code:iDt.toString(),name: persoana.adresaList[0].mediuLocalitate.valueOf()})
            // Object.values(MediuLocalitate).map((t,index)=>{
            //     let ds:DataSimple={name: t.valueOf(),code: index.toString(),load: null }
            //     setTipLoca(prevState => [...prevState,ds]);
            //
            // });
        }


    },[persoana])

    useEffect(()=>{
        // if(refLocaSup.current&&lsup){
        //     refLocaSup.current.value=lsup;
        // }
        console.log(lsup);
        refLocaSup.current.value=lsup;
        setTipLoca([]);
        Object.values(MediuLocalitate).map((t,index)=>{
            let ds:DataSimple={name: t.valueOf(),code: index.toString(),load: null};
            console.log("Adaug");
            console.log(ds);
            setTipLoca(prevState => [...prevState,ds]);

        });

    },[lsup])
     let getLocaSup=async (cod:number)=>{
        let api=new Api();
        if(cod){
            let response=await api.getLocalitateByCod(cod);
            console.log("Response =");
            console.log(response);
            if(response){
                return response.denumireLocalitate;
            }else{
                return null;
            }
        }
        return null;
     }

    return (
        <>

            <div className={"p_fld div_jud"}>
                <label className={"lblCi"} htmlFor={"pers_jud"}>Judet</label>

                <input  ref={refJud} type={"text"} className={"search jud"} id={"pers_jud"} defaultValue={""} />

            </div>

            <div className={"p_fld div_loca_inf"}>
                <label className={"lblCi"} htmlFor={"pers_locainf"}>Localitate Inferioara</label>

                <input  ref={refLocaInf} type={"text"} className={"search loca_inf"} id={"pers_locainf"} defaultValue={persoana?persoana.adresaList[0].locaInf:""} />

            </div>

            {
                lsup?(
                    <>
                        <div className={"p_fld div_loca_sup"}>
                            <label className={"lblCi"} htmlFor={"pers_locasup"}>Localitate Superioara</label>

                            <input  ref={refLocaSup} type={"text"} className={"search loca_sup"} id={"pers_locasup"} defaultValue={persoana?persoana.adresaList[0].locaSup:""} />

                        </div>
                    </>

                ):
                    <>
                        <div className={"p_fld div_loca_sup"}>
                            <label className={"lblCi"} htmlFor={"pers_locasup"}>Localitate Superioara</label>

                            <input  ref={refLocaSup} type={"text"} className={"search loca_sup"} id={"pers_locasup"} defaultValue={""} />

                        </div>




                </>


            }

            <div className={"p_fld div_str"}>
                <label className={"lblCi"} htmlFor={"pers_str"}>Strada</label>

                <input  ref={refStrada} type={"text"} className={"search str"} id={"pers_str"} defaultValue={""} />

            </div>

            <div className={"p_fld div_nrstr"}>
                <label className={"lblCi"} htmlFor={"pers_nrstr"}>Nr</label>

                <input  ref={refNrStrada} type={"text"} className={"search nrstr smalltext"} id={"pers_nrstr"} defaultValue={""} />

            </div>

            <div className={"p_fld div_casa"}>
                <label className={"lblCi"} htmlFor={"pers_casa"}>Bloc/Casa</label>

                <input  ref={refBlCas} type={"text"} className={"search casa smalltext"} id={"pers_casa"} defaultValue={""} />

            </div>

            <div className={"p_fld div_sc"}>
                <label className={"lblCi"} htmlFor={"pers_sc"}>Scara</label>

                <input  ref={refSc} type={"text"} className={"search sc smalltext"} id={"pers_sc"} defaultValue={""} />

            </div>

            <div className={"p_fld div_et"}>
                <label className={"lblCi"} htmlFor={"pers_et"}>Etaj</label>

                <input  ref={refEt} type={"text"} className={"search et smalltext"} id={"pers_et"} defaultValue={""} />

            </div>

            <div className={"p_fld div_ap"}>
                <label className={"lblCi"} htmlFor={"pers_ap"}>Ap</label>

                <input  ref={refAp} type={"text"} className={"search ap smalltext"} id={"pers_ap"} defaultValue={""} />

            </div>

            <div className={"p_fld div_tel"}>
                <label className={"lblCi"} htmlFor={"pers_tel"}>Telefon</label>

                <input  ref={refTel} type={"text"} className={"search tel mediumtext"} id={"pers_tel"} defaultValue={""} />

            </div>

            <div className={"p_fld div_email"}>
                <label className={"lblCi"} htmlFor={"pers_email"}>Email</label>

                <input  ref={refEmail} type={"text"} className={"search tel mediumtext2"} id={"pers_email"} defaultValue={""} />

            </div>

            <div className={"p_fld div_tiploc"}>
                <label className={"lblCi"} htmlFor={"dvgsimple_tiploc"}>Tip Localitate</label>


                <div className={"dvsimple divTipLoca"} id={"dvsimple_tiploc"} >

                    {
                        tipLoca.length>0?(
                            <Simpl  data={tipLoca} defaultObj={defaTipLoca} returnFunction={null} isrw={false}/>

                        ):""

                    }


                </div>



                {/*<input  ref={refTipLoca} type={"text"} className={"search tiploc smalltext1"} id={"pers_tiploc"} defaultValue={""} />*/}

            </div>

        </>
    )

}

export default Index;