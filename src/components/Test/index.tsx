
import React, {SyntheticEvent, useRef, useState} from 'react';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import {WrapperTest} from "./indexstyle";
import ExpandableRow from "../ExpandableRow";

const head={
    id: 1,
    den: "Randul unu"
};

const data1=[
    {
        "idhead": 1,
        "id":1,
        "den":"lkawljaljdlaksj"
    },
    {
        "idhead": 1,
        "id":2,
        "den":"lkd le ri wewrek"
    }

];


export default function Test() {

    return(
        <>
            <ExpandableRow headerRow={head} data={data1}/>
        </>
    );
}
