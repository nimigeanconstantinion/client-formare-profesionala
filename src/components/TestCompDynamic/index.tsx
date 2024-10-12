import {ReactElement, useEffect} from "react";
import Comp1 from "./index_comp1"
import Comp2 from "./index_comp2"



interface LoadType{
    [hey: string]: any
}

interface ScreeProp{
    comp:number
}

const Index:React.FC<ScreeProp>=(comp)=>{


    useEffect(()=>{
            retComp();
    },[])


    let retComp=()=>{
        let cmp:ReactElement|null=null;

        if(comp.comp==1){
            let cp:LoadType={
                name: "unu",
                etc: "jkjllllj"

            }
            cmp=(<Comp1 data={cp}/>)
        }else{
            let cp:LoadType={
                name: "kjkkk",
                etc: "doi"

            }
            cmp=(<Comp2 data={cp}/>)


            }
        if(cmp){
            return cmp



        }else{
            return ""

        }
    }
    //
    return(
        <>
            {
                comp.comp>0?(
                    <>
                        {retComp()}
                    </>
                ):""
            }
        </>
    )
}

export default Index;