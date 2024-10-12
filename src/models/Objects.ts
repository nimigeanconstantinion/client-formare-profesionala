import Nomenclator from "./NomCor";
import {Cursant} from "./Cursant";
export default interface Curs {
    id: number; // Assuming id is auto-incremented to number instead of long
    nrCurs: number; // Course number (unique)
    dataStart: Date;
    dataSfarsit: Date;
    dataExamen: Date;

    furnizor: Furnizor; // Reference to the provider object
    finantare: Finantare; // Reference to the funding object

     cursantList: Cursant[]; // List of enrolled students

    nrProcesVerbalExamen: string;
    dataProcesVerbalExamen: Date;

    autorizatie: Autorizatie; // Reference to the authorization object (eagerly loaded)
    nomenclator: Nomenclator; // Reference to the course category object (eagerly loaded)

    oreTotal: number;
    oreTeorie: number;
    orePractica: number;

    tipCertificat: TipCertificat; // Enum representing certificate type
    responsabil: string;

    organizator: string;
    codFiscalOrg: string;

    tipFurnizor: TipFurnizor; // Enum representing provider type
    tipCurs: TipCurs; // Enum representing course type (full-time, part-time, etc.)

    nrDispozitie?: string; // Optional disposition number
    dataDisp?: Date; // Optional disposition date
}

// Assuming separate interfaces for related entities (Furnizor, Finantare, etc.)
export interface Furnizor {
    id: number; // Assuming id is of type number
    denumire: string;
    codFiscal: string;
}

interface Finantare {

    id: number; // Assuming id is of type number
    codScurt: string;
    denumire: string;
    codSMIS: string;
    fn: number; // Assuming fn and fe are of type number (converted from BigDecimal)
    fe: number;
    // ... properties of the funding entity
}


export enum TipCurs {
    COMPETENTE_COMUNE = "competente comune",
    PERFECTIONARE = "perfectionare",
    SPECIALIZARE = "specializare",
    INITIERE = "initiere",
    CALIFICARE = "calificare",
}
export enum TipFurnizor {
    AJOFM = "AJOFM",
    CRFPA = "CRFPA",
    FURNIZOR = "FURNIZOR AUTORIZAT",
}


export enum TipCertificat {
    ABSOLVIRE = "ABSOLVIRE",
    CALIFICARE = "CALIFICARE",
}
export interface Autorizatie {
    id: number; // Assuming id is of type number
    nrAutorizatie: string;
    dataAutorizatie: Date;
    dataExpirarii: Date;
    nrRNFPA: string;
    dataRNFPA: Date;
    tipCurs: TipCurs; // Reference to TipCurs enum
    totalOre: number;
    oreTeorie: number;
    orePractica: number;
    nomenclator: Nomenclator; // Reference to Nomenclator interface
    bazaLegala: string;
    condAcces: string;
    notare: string; // Assuming "nota" refers to "notare" property
    nivel: number;
    competente: Competenta[]; // Array of Competenta objects
    dateAdd: Date;

    // Methods (optional):

}

export interface Competenta {
    id: number; // Assuming id is of type number
    denumire: string;
    autorizatie?: Autorizatie; // Optional reference to Autorizatie interface (due to FetchType.LAZY)
}


