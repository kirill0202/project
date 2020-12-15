import React, { useContext } from "react";
import withWidth from "@material-ui/core/withWidth";
import { useTheme } from '@material-ui/core/styles';
import { makeStyles, Box, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import { People, Close, ChevronRight, ChevronLeft } from '@material-ui/icons';
import clsx from 'clsx';
import { ThemeContext } from "../../../context/themeContext";
import { Area, AreaChart, CartesianGrid, Label, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const StatisticsMonthly = ({ width }) => {
    const { currentTheme } = useContext(ThemeContext);

    const useStyles = makeStyles((theme) => ({
        contStatistics: {
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : '',
            width: width === 'lg' ? '18vw' : width === 'xl' ? '18vw' : width === 'md' ? '83vw' : width === 'sm' ? '96vw' : '96vw',
            padding: '15px',
            margin:'10px 10px'
        }
    }));

    const dataLine = [
        { name: 'A', uv: 2300, pv: 2400 },
        { name: 'B', uv: 2500, pv: 2300 },
        { name: 'C', uv: 2700, pv: 1800 },
        { name: 'D', uv: 5300, pv: 2400 },
        { name: 'E', uv: 4500, pv: 1900 },
        { name: 'F', uv: 3300, pv: 3400 },
        { name: 'G', uv: 2300, pv: 2400 },
    ]

    const createLine = data => {
        return (
            <LineChart
                width={width === 'xs' ? 265 : width === 'sm' ? 470 : width === 'md' ? 750 : width === 'lg' ? 220 : 300} 
                height={200} 
                data={dataLine}
                margin={{ left: 10 }}
                syncId="test"
            >
                {/* <CartesianGrid stroke='none' verticalFill={['#0c0c1b', '#0c0c1b']} horizontalFill={['rgb(117, 117, 163)', 'rgb(117, 117, 163)']} /> */}
                <XAxis dataKey="name" axisLine={{ stroke: 'rgb(117, 117, 163)' }} />
                {/* <Tooltip itemStyle={{color:'rgb(117, 117, 163)'}} /> */}
                <Line type='monotone' dataKey='uv' stroke='#4b7cf3' strokeWidth="4px" />
            </LineChart>
        )
    }

    const classes = useStyles();

    return (
        <>
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100vw',
                marginTop: '25px'
            }}>
                <Typography variant="h5" style={{
                    color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                    width: '100vw',
                    paddingBottom: '20px',
                    marginLeft:'10px'
                }}>
                    Статистика за месяц
              </Typography>
                <Box style={{
                    maxWidth: width === 'xs' ? '90vw' : width === 'sm' ? '80vw' : width === 'md' ? '86vw' : width === 'lg' ? '90vw' : '90vw',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}>


                    <Box
                        className={classes.contStatistics}
                        >
                        <Box style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                        }}>
                            <Typography variant='h4'>78,367</Typography>
                            <Typography variant='h6'>Всего продаж</Typography>
                        </Box>
                        <Box>{createLine}</Box>
                    </Box>

                    <Box
                        className={classes.contStatistics}
                        >
                        <Box style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                        }}>
                            <Typography variant='h4'>+90%</Typography>
                            <Typography variant='h6'>Рост продаж</Typography>
                        </Box>
                        <Box>{createLine}</Box>
                    </Box>

                    <Box
                        className={classes.contStatistics}
                        >
                        <Box style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                        }}>
                            <Typography variant='h4'>900</Typography>
                            <Typography variant='h6'>Завершено</Typography>
                        </Box>
                        <Box>{createLine}</Box>
                    </Box>

                    <Box
                        className={classes.contStatistics}
                        >
                        <Box style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                        }}>
                            <Typography variant='h4'>$78.62M</Typography>
                            <Typography variant='h6'>Оплачено в крипте</Typography>
                        </Box>
                        <Box>{createLine}</Box>


                    </Box>

                </Box>


            </Box>
        </>
    );
};

export default withWidth()(StatisticsMonthly);