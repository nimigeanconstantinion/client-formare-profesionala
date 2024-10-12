// interface Nume{
//     id:number;
//     nume:string;
// }

import {Nume} from "./Cursant";

export interface CarteIdentitate {
    id: number; // Assuming id is a number type

    persoana: Persoana; // Reference to Persoana object

    serie: string;
    numar: string;
    dataAdd: Date; // Assuming dataAdd is actually dataEmiterii (date of issuance)
}



export interface Adresa {
    id: number; // Assuming id is a number type

    persoana: Persoana; // Reference to Persoana object

    localitate: Localitate; // Reference to Localitate object (assuming Localitate interface exists)

    locaInf: string; // Informational location
    locaSup: string; // Superior location

    judet: string;
    tara: string;
    strada: string;
    nrStrada: string; // Street number

    blCasa: string; // Building block
    scara: string;
    et: string; // Floor
    ap: string; // Apartment

    tel: string; // Phone number
    email: string;

    dataInregistrare: Date; // Assuming dateAdd is for registration

    mediuLocalitate: MediuLocalitate; // Type of locality (e.g., URBAN, RURAL)
}

export enum MediuLocalitate {
    URBAN = "URBAN",
    RURAL = "RURAL",
}
export interface Localitate {
    id: number; // Assuming id is a number type

    siruta: number; // Assuming siruta is a number type
    sirutaSup: number; // Assuming sirutasup is a number type
    tip: number;

    denumireLocalitate: string;
    judet: number;
}

interface NomenclatorStudii {
    id: number;
    codStudii: number;
    isced: Isced; // Assuming Isced is a separate interface or type
    denumire: string;
    active: boolean;
    dataActivarii: Date;
    dataModificarii: Date;
}

enum Isced {
    ISCED0 = "Educatie timpurie",
    ISCED1 = "Invatamant primar",
    ISCED2 = "Invatamant gimnazial",
    ISCED3 = "Invatamant liceal",
    ISCED4 = "Invatamant postliceal",
    ISCED5 = "Invatamant superior de scurta durata",
    ISCED6 = "Licenta sau nivel echivalent",
    ISCED7 = "Master sau nivel echivalent",
    ISCED8 = "Doctorat sau nivel echivalent",
}

interface Studii {
    id: number; // Assuming long is mapped to number in your persistence layer
    persoana: Persoana; // Assuming Persoana interface exists
    nomStudii: NomenclatorStudii;
    dataAdd: Date;
}

export default interface Persoana {
    id: number; // Assuming id is a number type

    cnp: string;

    nume: Nume[]; // Array of Nume objects

    prenume: string;

    prenumeTata: string;
    prenumeMama: string;

    localitateNastere: string;
    judetNastere: string;
    taraNastere: string;

    carteIdentitateList: CarteIdentitate[]; // Array of CarteIdentitate objects

    adresaList: Adresa[]; // Array of Adresa objects

    studiiList: Studii[]; // Array of Studii objects
}

