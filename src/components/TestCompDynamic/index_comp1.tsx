import {useEffect} from "react";


interface Comp1Props{
    data:LoadType
}

interface LoadType{
    [hey: string]: any
}

const Index1:React.FC<Comp1Props>=(data)=>{



    useEffect(()=>{
        let ks=data.data[0]
    },[])
    return(
        <>
            <p>
                componenta 1 {data.data[0]}
            </p>
        </>
    )
}

export default Index1;