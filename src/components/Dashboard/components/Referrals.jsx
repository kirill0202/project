import React, { useContext } from "react";
import withWidth from "@material-ui/core/withWidth";
import { useTheme } from '@material-ui/core/styles';
import { makeStyles, Box, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import { People, Close, ChevronRight, ChevronLeft } from '@material-ui/icons';
import clsx from 'clsx';
import { ThemeContext } from "../../../context/themeContext";
import { DataGrid } from '@material-ui/data-grid';

const Referrals = ({ width }) => {
    const { currentTheme } = useContext(ThemeContext);

    const useStyles = makeStyles((theme) => ({
        grid: {
            '& .MuiIconButton-label':{
                color: currentTheme === 'dark' ? '#aeaee0' : '#595c97'
            },
            '& .MuiDataGrid-root .MuiDataGrid-cellRight':{
                    textAlign:'left'
            },
            '& .MuiDataGrid-root .MuiDataGrid-cell':{
                border:'none'
            },
            '& .MuiDataGrid-root .MuiDataGrid-colCellTitleContainer':{
                justifyContent:'center'
            },
            '& .MuiDataGrid-root .MuiDataGrid-colCellRight .MuiDataGrid-colCellTitleContainer':{
                justifyContent:'center'
            },
            '& .MuiDataGrid-colCell-draggable':{
                width:'100vw',
                display:'flex',
                justifyContent:'center'
            },
            '& .MuiTablePagination-root':{
                color: currentTheme === 'dark' ? '#aeaee0!important' : '#595c97!important'
            },
            '& .MuiDataGrid-root':{
                border:'none',
                color: currentTheme === 'dark' ? '#aeaee0!important' : '#595c97!important',
                backgroundColor: currentTheme === 'dark' ? 'rgb(20, 19, 34)' : 'white',
                margin:'15px',
                fontSize:'21px',
            }
        }
    }));


    const columns = [
        { field: 'id', headerName: 'ID', width: 170 },
        { field: 'firstName', headerName: 'First name', width: 230 },
        { field: 'lastName', headerName: 'Last name', width: 230 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 190,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 260,
            valueGetter: (params) =>
                `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    const classes = useStyles();

    return (
        <>
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100vw',
                margin: '20px 10px'
            }}>


                <Box style={{
                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                    maxWidth: width === 'xs' ? '73vw' : width === 'sm' ? '70vw' : width === 'md' ? '78.5vw' : width === 'lg' ? '84.5vw' : '86.5vw',
                    margin: '10px',
                    border: currentTheme === 'dark' ? '1px solid #232135' : 'none',
                    padding:'15px 35px 35px 15px',
                    display:'flex',
                    justifyContent:'center',
                    flexDirection:'column'
                }}>


                    <Typography variant="h5" style={{
                        color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                        width: '100vw',
                        padding: '0px 0px 20px 0px',
                        margin: '20px 0px',
                        // borderBottom:'1px solid rgb(174, 174, 224)'
                    }}>
                        Последние рефералы
              </Typography>


                    <div className={classes.grid} style={{ height: 400, width: width === 'xs' ? '70vw' : width === 'sm' ? '70vw' : width === 'md' ? '80vw' : width === 'lg' ? '84vw' : '86vw' }}>
                        <DataGrid  rows={rows} columns={columns} pageSize={5}  />
                    </div>


                </Box>


            </Box>
        </>
    );
};

export default withWidth()(Referrals);