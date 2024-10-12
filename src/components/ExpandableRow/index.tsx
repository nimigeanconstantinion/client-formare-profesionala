
import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import {WrapperExpand} from "./indexstyle";

interface head{
    id:number,
    den:string
}

interface content{
    idhead:number,
    id:number,
    den:string
}

interface ERProps{
    headerRow:head|null
    data:content[]
}




const Index:React.FC<ERProps>=(props)=>{

    const [head,setHead]=useState<head|null>(null);
    const [rows,setRows]=useState<content[]>([]);
    const [show,setShow]=useState(false);
    const [child2Position, setChild2Position] = useState({ top: 0, left: 0 });
    useEffect(()=>{
        setHead(props.headerRow);
        setRows(props.data);
        setShow(false);
    },[])

    let toog=(e:SyntheticEvent)=>{
        // const child1Element = document.querySelector('.row') as HTMLElement;
        const child1Element=e.target as HTMLElement;
        const elm=child1Element.parentNode as HTMLElement;
        const parinte=elm as HTMLElement;
        console.log(child1Element);
        console.log(parinte.parentNode);

        if(parinte){
            // const rect = child1Element.getBoundingClientRect();
            // const containerRect = parinte.getBoundingClientRect();
            const rand=parinte.parentNode as HTMLElement;
            const rect = rand.getBoundingClientRect();
            const containerRect = child1Element.parentElement!.getBoundingClientRect();


            // Obține coordonatele colțului din stânga sus al lui child1
            const top = 0;
            const left = rect.left - containerRect.left;
            console.log("Top la rect= "+rect.top+",height="+rect.height);
            console.log("top container="+containerRect.top);
            // Obține coordonatele colțului din stânga sus al lui child1
            // const top = containerRect.top +100;
            // const left = rect.left - containerRect.left;

            // Poziționează child2 relativ la colțul stâng sus al lui child1
            setChild2Position({
                top: top+rect.height, // De exemplu, 20px sub child1
                left: left  // De exemplu, 20px la dreapta de child1
            });

        }
        setShow(prevState => !prevState);
    }

    return(
        <WrapperExpand top={child2Position.top} left={0}>
            <div className={"row"}>
              <p>
                {head?.den}
              </p>

                {
                    show==false?(
                        <div className={"icon"}>
                            <i className="pi pi-plus" onClick={(event)=>toog(event)}></i>
                        </div>
                    ):(
                        <div className={"icon"}>
                            <i className="pi pi-minus" onClick={(event)=>toog(event)}></i>
                        </div>
                    )

                }


            </div>
            {
                rows.length>0&&show?(
                        <div className={"extend"}>
                            {
                                rows.map(r=>{
                                    return(
                                        <div className={"detail"}>
                                            <p>{r.idhead}</p>
                                            <p>{r.id}</p>
                                            <p>{r.den}</p>
                                        </div>

                                    );
                                })
                            }
                        </div>

                ):""
            }
        </WrapperExpand>
    );
}

export default Index;

// export default function Test() {
//
//     const [show,setSow]=useState<boolean>(false);
//     const [child2Position, setChild2Position] = useState({ top: 0, left: 0 });
//
//
//     let toog=(event:SyntheticEvent)=>{
//         // const child1Element = document.querySelector('.row') as HTMLElement;
//         const child1Element=event.target as HTMLElement;
//         const elm=child1Element.parentNode as HTMLElement;
//         const parinte=elm as HTMLElement;
//         console.log(child1Element);
//         console.log(parinte.parentNode);
//
//         if(parinte){
//             const rect = child1Element.getBoundingClientRect();
//             const containerRect = parinte.getBoundingClientRect();
//
//             console.log("Top la rect= "+rect.top);
//             console.log("top container="+containerRect.top);
//             // Obține coordonatele colțului din stânga sus al lui child1
//             const top = containerRect.top -4* containerRect.height;
//             const left = rect.left - containerRect.left;
//
//             // Poziționează child2 relativ la colțul stâng sus al lui child1
//             setChild2Position({
//                 top: top  , // De exemplu, 20px sub child1
//                 left: left  // De exemplu, 20px la dreapta de child1
//             });
//
//         }
//         setSow(prevState => !prevState);
//     }
//
//     return (
//
//         <>
//
//             {/*// <WrapperTest  top={child2Position.top} left={child2Position.left}>*/}
//             {/*//         <div className={"row"}>*/}
//             {/*//             <p>Jhkjgwdkjg </p>*/}
//             {/*//             {*/}
//             {/*//                 show?(*/}
//             {/*//                     <div className={"icon"}>*/}
//             {/*//                         <i className="pi pi-minus" onClick={(event)=>toog(event)}></i>*/}
//             {/*//*/}
//             {/*//                     </div>*/}
//             {/*//                 ):(*/}
//             {/*//                     <>*/}
//             {/*//*/}
//             {/*//                         <div className={"icon"}>*/}
//             {/*//                             <i className="pi pi-plus" onClick={(event)=>toog(event)}></i>*/}
//             {/*//*/}
//             {/*//                         </div>*/}
//             {/*//*/}
//             {/*//*/}
//             {/*//*/}
//             {/*//                     </>*/}
//             {/*//*/}
//             {/*//*/}
//             {/*//*/}
//             {/*//                 )*/}
//             {/*//             }*/}
//             {/*//*/}
//             {/*//*/}
//             {/*//         </div>*/}
//             {/*//     {*/}
//             {/*//         show?(*/}
//             {/*//            <>*/}
//             {/*//                <div className={"extend"}>*/}
//             {/*//                    <p>Lorem lsdhfskjd fsdfj;lsdjf s;dljf;lsj df;osajdf'ah'edfihsdufh eoufhowieyd aosyfoaisyf sdofiysodifyos dfisdyfoisydfoiys dfo</p>*/}
//             {/*//                </div>*/}
//             {/*//            </>*/}
//             {/*//         ):""*/}
//             {/*//     }*/}
//             {/*//*/}
//             {/*// </WrapperTest>*/}
//
//
//
//
//             {
//                 show||1==1?(
//                     <WrapperTest top={child2Position.top} left={child2Position.left}>
//                         {
//                             data1.map(n=>{
//                                 return(
//                                     <>
//                                         <div key={n.id} className={"row"}>
//                                             <p>KKkladld {n.den}</p>
//                                             {
//                                                 show?(
//                                                     <div className={"icon"}>
//                                                         <i className="pi pi-minus" onClick={(event)=>toog(event)}></i>
//
//                                                     </div>
//                                                 ):(
//                                                     <>
//
//                                                         <div className={"icon"}>
//                                                             <i className="pi pi-plus" onClick={(event)=>toog(event)}></i>
//
//                                                         </div>
//
//
//
//                                                     </>
//
//
//
//                                                 )
//                                             }
//
//
//                                         </div>
//                                         <div>
//                                             {
//                                                 show?(
//                                                     <>
//                                                         <div className={"extend"}>
//                                                             <p>Lorem lsdhfskjd fsdfj;lsdjf s;dljf;lsj df;osajdf'ah'edfihsdufh eoufhowieyd aosyfoaisyf sdofiysodifyos dfisdyfoisydfoiys dfo</p>
//                                                         </div>
//                                                     </>
//                                                 ):""   }
//                                         </div>
//
//                                     </>
//
//
//                                 )
//
//                             })
//                         }
//
//
//                     </WrapperTest>
//
//
//                 ):""
//
//             }
//
//
//
//
//
//
//
//
//
//
//
//
//
//         </>
//
//
//     );
// }
