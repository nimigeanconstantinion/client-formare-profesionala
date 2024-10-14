import Nom_Cor from "./models/NomCor";
// import HttpResponse from "./models/HttpResponse";
import ResponseImpl from "./models/ResponseImpl";
import NomCor from "./models/NomCor";
import HttpResponse from "./models/HttpResponse";
import Persoana, {Localitate} from "./models/Persoana";
import Curs, {Autorizatie} from "./models/Objects";
import Nomenclator from "./models/NomCor";
import {Nume} from "./models/Cursant";
import {log} from "util";

//keep  // ,
//                 // "Access-Control-Allow-Origin": "http://localhost:3000"

export default class Api{

    api<T, U>(path: string, method = "GET", body: U): Promise<HttpResponse<T>> {




        const url= "http://78.96.25.131:5000"+ path;

        // const url = path;

        console.log(url);
        const options: RequestInit = {
            method,
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },


            body: body == null ? null : JSON.stringify(body)
        }
        return fetch(url, options)
    }


    getNomCor = async (trunc:string): Promise<NomCor[]> => {

        let response = await this.api("/api/v1/test/nomenclator/"+trunc, "GET", null);
        if(response.status===200){
            console.log("Raspuns")
            console.log(response.data);
            // let rsp= data;
            return response.json();
        }else {
            return Promise.reject([]);
        }

    }

    // http://codeplus.ddns.net:8080/api/v1/loader/getpersbycnp/1650208335048

    getPersByCnp = async (cnp:string): Promise<Persoana> => {

        let response = await this.api(`/api/v1/loader/getpersbycnp/${cnp}`, "GET", null);
        if(response.status===200){
            console.log("Raspuns")
            console.log(response.data);
            // let rsp= data;
            return response.json();
        }else {
            return Promise.reject([]);
        }

    }

    getCursByNr= async (nrc:number): Promise<Curs> => {

        let response = await this.api(`/api/v1/loader/cursbyid/${nrc}`, "GET", null);
        if(response.status===200){
            // console.log("Raspuns")
            // console.log(response.data);
            // let rsp= data;
            return response.json();
        }else {
            return Promise.reject([]);
        }

    }

    getAllCursuri= async (): Promise<Curs[]> => {

        let response = await this.api(`/api/v1/loader/cursuriall`, "GET", null);
        if(response.status===200){
            console.log("Raspuns")
            console.log(response.data);
            // let rsp= data;
            return response.json();
        }else {
            return Promise.reject([]);
        }

    }

    getNomenclatorFormare=async ():Promise<Nomenclator[]>=>{
        let response= await this.api('/api/v1/loader/nomenclator','GET',null);
        if(response.status==200){
            return response.json();
        }else{
            return Promise.reject([]);
        }
    }

    filterNomenclatorFormareByDen=async (den:string):Promise<Nomenclator[]>=>{
        let response= await this.api(`/api/v1/loader/nomenclator/${den}`,'GET',null);
        if(response.status==200){
            return response.json();
        }else{
            return Promise.reject([]);
        }
    }


    getAutorizatii=async (den:string|null):Promise<Autorizatie[]>=>{

        let response= await this.api(`/api/v1/test/autorizatii/${den!=null&&den.includes('/')==false?den:''}`,'GET',null);
        if(response.status==200){
            return response.json();
        }else{
            return Promise.reject([]);
        }
    }

    getListaNumeByCNP=async (cnp:string|null):Promise<Nume[]>=>{

        let response= await this.api(`/api/v1/nume/${cnp}`,'GET',null);
        if(response.status==200){
            return response.json();
        }else{
            return Promise.reject([]);
        }
    }


    getLocalitateByCod=async (cod: number):Promise<Localitate>=>{

        let response= await this.api(`/api/v1/test/siruta/${cod}`,'GET',null);
        if(response.status==200){
            return response.json();
        }else{
            return Promise.reject([]);
        }
    }

    // getAutorizatiiByID=async (id:number):Promise<Autorizatie[]>=>{
    //
    //     let response= await this.api(`http://localhost:8080/api/v1/test/autorizatii/${den!=null?den:''}`,'GET',null);
    //     if(response.status==200){
    //         return response.json();
    //     }else{
    //         return Promise.reject([]);
    //     }
    // }
}