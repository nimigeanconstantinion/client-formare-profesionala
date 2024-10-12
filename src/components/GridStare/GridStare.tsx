import React, {useEffect, useState} from "react";
import {PerioadaSomaj} from "../../models/Cursant";
import Row from "./RowStare"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCoffee, faSquareMinus, faSquarePlus} from '@fortawesome/free-solid-svg-icons'
import store from "../../store/store";

interface GridPerSomProps{
    data: PerioadaSomaj[]|undefined
}

const Index:React.FC<GridPerSomProps>=({data})=>{

    const [listPer,setListPer]=useState<PerioadaSomaj[]>([]);
    const [crtIndx,setCrtIndx]=useState<number>();
    const cursant=store.getState().cursState
    useEffect(()=>{
        console.log("In GRID PERIOADA SOMAJ");
        console.log(data);
        if(data!=undefined){
            setListPer(data);

        }
    },[data])


    let plusClk=()=>{
        setListPer(prevState => {
            if(prevState){

                return [...prevState,{id: null,nrSomaj:"",dataStartSomaj: new Date(),dataSfSomaj: new Date,dataadd:new Date} as PerioadaSomaj];
            }else{
                let list:PerioadaSomaj[]=[];
                list.push({id:null,nrSomaj:"",dataStartSomaj: new Date(),dataSfSomaj: new Date,dataadd:new Date} as PerioadaSomaj)
                return  list;
            }
        })
    }

    let minusClk=()=>{
      setListPer(prevState => {
          return prevState.filter((a,index)=>index!=crtIndx)
      })

    }
    return(
        <>
            <div className={"grd header top"}>
                <p>Perioada Somaj</p>
                <div className={"grpcmmd"}>


                    <FontAwesomeIcon className={"psfabtn"} icon={faSquarePlus}  onClick={plusClk}/>
                    <FontAwesomeIcon className={"psfabtn"} icon={faSquareMinus}  onClick={minusClk}/>


                </div>


            </div>

            <div className={"grd table top"}>
                <p className={"divtbl nrs"}>Nr Somaj</p>
                <p className={"divtbl dst"}>Data Start</p>
                <p className={"divtbl dsf"}>Data Sfarsit</p>
                <p className={"divtbl sld"}>SLD?</p>
            </div>
            {
                listPer?(
                   listPer.map((e,index)=>{
                     return  (
                         <div onClick={()=>setCrtIndx(index)}>
                             {/*<Row id={index} data={e}/>*/}

                         </div>
                     )
                   })
                ):(
                    ""

                )
            }

        </>

    )

}

export default Index;