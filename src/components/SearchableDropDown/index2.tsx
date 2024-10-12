import React, { useEffect, useState } from 'react';
import {AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent} from "primereact/autocomplete";
import { CountryService } from './CountryService';
import {WrapperSearch} from "./indexstyle";
import Api from "../../Api";
import Nomenclator from "../../models/NomCor";
export interface Data {
    name: string;
    code: string;
    load: Nomenclator|undefined;
}

export interface AutoCompProps{
    content:Data[]
}

 const TemplateDemo:React.FC<AutoCompProps>=(props)=>{

    const [countries, setCountries] = useState<Data[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Data>();
    const [filteredCountries, setFilteredCountries] = useState<Data[]>();
    const [bottomText, setBottomText]=useState(null);



     function formatDate(dateStr: string): string {
         // Parse the date string into a Date object
         const date = new Date(dateStr);

         // Format the date object into the desired format (MM/DD/YYYY)
         const formattedDate = date.toLocaleDateString("en-US", {
             year: "numeric",
             month: "2-digit",
             day: "2-digit",
         });

         return formattedDate;
     }
    const search = (event: AutoCompleteCompleteEvent) => {
        // Timeout to emulate a network connection
        setTimeout(() => {
            let _filteredCountries;

            if (!event.query.trim().length) {
                _filteredCountries = [...countries];
            }
            else {
                _filteredCountries = countries.filter((country) => {
                    return country.name.toLowerCase().includes(event.query.toLowerCase());
                });
            }

            setFilteredCountries(_filteredCountries);
        }, 250);
    }

    const itemTemplate = (item: Data) => {
         let dt=new Date(item.load!.dataAdd.toString());
        // console.log("Anul="+dt.getFullYear())
        // const day = String(item.load?.dataAdd.getDate()).padStart(2, '0');
        // const month = String(item.load!.dataAdd.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        // try {
        //     console.log("Elooooo"+item.load!.dataAdd.toString().substring(0,4));
        //     const formattedOutput = formatDate(item.load!.dataAdd.toString());
        //     console.log(formattedOutput); // Output: 01/01/1900
        // } catch (error) {
        //     console.error("Oribil"); // Handle invalid date format errors gracefully
        // }

        // let x=`${day}/${month}/${year}`

        // return `${day}/${month}/${year}`;
        return (

            <div className="flex itm">
                {/*<img*/}
                {/*    alt={item.name}*/}
                {/*    src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"*/}
                {/*    className={`flag flag-${item.code.toLowerCase()} mr-2`}*/}
                {/*    style={{width: '18px'}}*/}
                {/*/>*/}
                <div className={"divcode"}>{item.code}</div>
                <div className={"divname"}>{item.name.trim()}</div>
                {/*<input type={"text"} className={"divname"} value={item.name.trim()} disabled={true}/>*/}
                {
                    (item.load!.dataAdd &&item.load!=undefined) ?(
                        <>
                            <div className={"div3"}>{dt.toLocaleDateString()}</div>

                        </>

                    ):("")
                }
            </div>
        );
    };

    const panelFooterTemplate = () => {
        const isCountrySelected = (filteredCountries || []).some( country => country['name'] === selectedCountry?.name );
        return (
            <div className="py-2 px-3">
                {isCountrySelected ? (
                    <span>
                        <b>{selectedCountry?.name}</b> selected.
                    </span>
                ) : (
                    'No Selection.'
                )}
            </div>
        );
    };

    // useEffect(() => {
    //     CountryService.getCountries().then((data) => setCountries(data));
    // }, []);

     useEffect(() => {
         CountryService.getCountries().then((data) => setCountries(data));
         loadNomenclaror().then((data)=>setCountries(data));
     }, []);

    let loadNomenclaror= async ():Promise<Data[]>=>{
        let api=new Api();
        let response =await api.getNomenclatorFormare();
        response.sort((a,b)=>a.denumire.localeCompare(b.denumire))
        let doc=document.getElementsByClassName(".py-2 px-3");
        if(doc.length>0&&doc[0]!=null){
            doc[0].innerHTML="ljhlksjdlkjerljk";
        }
        return response.map(n=>{
            return {name: n.denumire, code: n.cod, load: n}
        })

    }

    return (
        <WrapperSearch>

            <div className="card flex justify-content-center">
                <AutoComplete field="name" value={selectedCountry} suggestions={filteredCountries}
                              completeMethod={search} onChange={(e: AutoCompleteChangeEvent) => setSelectedCountry(e.value)} itemTemplate={itemTemplate} panelFooterTemplate={panelFooterTemplate} />
            </div>

        </WrapperSearch>

    )
}

export default TemplateDemo;