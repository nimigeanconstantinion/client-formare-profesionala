import React from 'react';
import ReactDOM from 'react-dom';
import DynamicGrid from "./DynamicGrid";
import {GridData} from "./DynamicGrid";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const index: React.FC = () => {
    const data: GridData[] = [
        { id: '1', content: 'Item 1' },
        { id: '2', content: '2024-10-10'},
        { id: '3', content: 'Item 3' },
        { id: '4', content: 'Item 4' },
        { id: '5', content: '2024-10-10' },
        { id: '6', content: 'Item 6' },
        { id: '7', content: 'Item 7' },
        { id: '8', content: '2024-10-10' },
        { id: '9', content: 'Item 9' },
        { id: '10', content: 'Item 10' },
        { id: '11', content: '2024-10-10' },
        { id: '12', content: 'Item 12' },
    ];

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div style={{ padding: '20px' }}>
                <h1>Dynamic Grid Example</h1>
                <DynamicGrid rows={4} columns={3} data={data} columnWidths={[100,120,600]} editableColumns={[false,true,true]} typeDataColumn={[false,true,false]} />
            </div>
        </ThemeProvider>
    );
};

export default index;