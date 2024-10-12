import Persoana from "./Persoana";
import Curs, {TipCertificat} from "./Objects";

// export interface Cursant {
//     id: number; // Assuming id is of type number
//     persoana: Persoana; // Reference to Persoana interface
//     curs: Curs; // Reference to CursDiv interface
//     nrContract: string;
//     dataContract: Date;
//
//     perioadaSomajList: PerioadaSomaj[]; // Array of PerioadaSomaj objects
//     stareCursantList: StareCursant[]; // Array of StareCursant objects
//     certificatList: Certificat[]; // Array of Certificat objects
//     cursantGrupTintaList: NomenclatorGrupTinta; // Reference to NomenclatorGrupTinta interface
// }

export interface Cursant{
    id: number;
    persoana: Persoana; // Assuming Persoana has an id field
    nume: Nume;
    curs: Curs; // Assuming Curs has an id field
    nrContract: string;
    dataContract: Date;
    perioadaSomajList: PerioadaSomaj[];
    stareCursantList: StareCursant[];
    certificatList: Certificat[];
    cursantGrupTinta: NomenclatorGrupTinta; // Assuming NomenclatorGrupTinta has an id field
    nomenclatorProfilare: NomenclatorProfilare; // Assuming NomenclatorProfilare has an id field
    mediaCurs: number;
    medieExamenAbs: number;
    dataAbsolvirii: Date;
}


export interface PerioadaSomaj{
    id: number|null; // Assuming id is of type number
    nrSomaj: string;
    dataStartSomaj: Date;
    dataSfSomaj: Date;
    somerLungaDurata: boolean;
    dataadd: Date;
}

export interface StareCursant {
    id: number; // Assuming id is of type number
    stare: NomenclatorStari; // Reference to NomenclatorStari interface
    dataStare: Date;
    tipCursant: TipCursant; // Reference to TipCursant enum
    denumireAngajator: string;
    codUnicInregistrare: string;
    lunaAng: number;
    anulAng: number;
    motivNeabsolvire?: MotivNeabsolvire; // Optional reference to MotivNeabsolvire interface (due to possible ManyToOne relationship)
}


export interface NomenclatorGrupTinta {
    id: number; // Assuming id is of type number
    cod: number;
    denumire: string;
    activ: boolean;
    dataActivarii: Date;
}


export interface MotivNeabsolvire {
    id: number; // Assuming id is of type number
    activ: boolean;
    codMotiv: number;
    denumire: string;
    tipMotivNeabsolvire?: TipMotivNeabsolvire; // Optional reference to TipMotivNeabsolvire enum (if applicable)
}
export interface NomenclatorStari {
    id: number; // Assuming id is of type number
    codStare: number;
    denumire: string;
    activ: boolean;
    dataAdd: Date;
}

export enum TipCursant {
    INDEMNIZAT = "INDEMNIZAT",
    NEINDEMNIZAT = "NEINDEMNIZAT",
    PCLM = "PCLM",
    PLATITOR = "PLATITOR",
}

export enum TipMotivNeabsolvire {
    NEIMPUTABIL,
    IMPUTABIL
}

export interface Certificat {
    id: number; // Assuming id is of type number
    tipCertificat: TipCertificat; // Reference to TipCertificat enum
    cursant: Cursant; // Reference to Cursant interface (assuming Cursant interface exists)
    serie: string;
    numar: string;
    nrDocIntrare: string;
    dataDocIntrare: Date;
    stareCertificat: StareCertificat; // Reference to StareCertificat interface (assuming it exists)
    dataStare: Date;
    duplicat: boolean;
}

export enum StareCertificat {
    BLANK = "BLANK",
    EMIS = "EMIS",
    RIDICAT = "RIDICAT",
    ANULAT = "ANULAT",
}

export interface NomenclatorProfilare{

}

export interface Nume{
    id: number,
    persoana?: Persoana,
    nume: string,
    prenume: string,
    dataAdd?: Date
}

export enum SLD{
    TRUE="true",
    FALSE="false"
}