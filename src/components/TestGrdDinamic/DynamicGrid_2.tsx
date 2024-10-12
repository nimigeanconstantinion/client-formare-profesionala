import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Calendar } from 'primereact/calendar';
import { Nullable } from 'primereact/ts-helpers';
import './DynamicGrid.css'

export interface GridData {
    id: string;
    content: string;  // Permit both string and Nullable<Date> types
}

interface DynamicGridProps {
    rows: number;
    columns: number;
    data: GridData[];
    columnWidths: number[];
    editableColumns: boolean[];
    typeDataColumn: boolean[];
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const DynamicGrid_2: React.FC<DynamicGridProps> = ({ rows, columns, data, columnWidths, editableColumns, typeDataColumn }) => {
    const itemsPerRow = Math.ceil(data.length / rows);
    const [gridData, setGridData] = useState(data);
    const tW=columnWidths.reduce((x,y)=>x+y,0);
    const tww:number=700;
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
        const newData = gridData.map(item => {
            if (item.id === id) {
                return { ...item, content: e.target.value };
            }
            return item;
        });
        setGridData(newData);
    };

    // const handleDateChange = ( e:React.ChangeEvent<HTMLInputElement>, id: string) => {
    //     const newData = gridData.map(item => {
    //         if (item.id === id) {
    //
    //             return { ...item, e.target.value };
    //         }
    //         return item;
    //     });
    //     // console.log(e)
    //     setGridData(newData);
    // };

    const formatContent = (content: string): string => {
        if (content) {
            return content; // Format date as string
        }
        return ''; // Use empty string if content is null or undefined
    };

    const commonStyle = {
        height: '100%',
    };

    return (
        <>
            <div className={"headerGrd"} style={{height: "30px",width: `${tW+2}px`,display: "flex",justifyItems: "flex-start",marginLeft: "5px"}}>
                <i className="pi pi-pencil" style={{marginLeft: "5px"}} ></i>
                <i className="pi pi-plus" style={{marginLeft: "5px"}}></i>
                <i className="pi pi-minus" style={{marginLeft: "5px"}}></i>

            </div>
            <Grid container spacing={0} style={{width: '${tW}px'}}>
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <Grid container item  spacing={0} key={`row-${rowIndex}`} className="custom-grid-item">
                        {gridData.slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow).map((item, colIndex) => (
                            <div className={"divRow"} key={item.id} style={{ width: `${columnWidths[colIndex]}px`, marginLeft: 1 }}>
                                {editableColumns[colIndex] ? (
                                    <>
                                        {!typeDataColumn[colIndex] ? (

                                            <input value={item.content} className={"texted"} type={"text"} onChange={(e) => handleInputChange(e, item.id)}/>
                                        ) : (
                                            <input value={item.content} className={"datepk"} type={"date"} onChange={(e) => handleInputChange(e, item.id)} />
                                        )}
                                    </>
                                ) : (
                                    <input value={item.content} className={"texted"} type={"text"} readOnly />
                                )}
                            </div>
                        ))}
                    </Grid>
                ))}
            </Grid>

        </>

    );
};

export default DynamicGrid_2;
