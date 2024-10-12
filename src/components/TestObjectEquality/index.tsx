import {useEffect} from "react";


const data=[
    {
        name: "Unu",
        load:{
            id: 1
        }
    },    {
        name: "Doi",
        load:{
            id: 2
        }
    },
    {
        name: "Trei",
        load:{
            id: 1
        }
    }


]
interface ObLoad{
    id: number
}

const Index:React.FC=()=>{

    let testEQ=()=>{
        let idd:string="id";
        console.log( data[0].load[idd as keyof Object]);


    }
    useEffect(()=>{
        testEQ();
    },[])
    return(
        <>
            <p>Gata</p>
        </>
    )
}

export default Index;