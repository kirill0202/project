import React, { useContext } from "react";
import withWidth from "@material-ui/core/withWidth";
import { useTheme } from '@material-ui/core/styles';
import { makeStyles, Box, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import { People, Close, ChevronRight, ChevronLeft } from '@material-ui/icons';
import clsx from 'clsx';
import { ThemeContext } from "../../../context/themeContext";
import { Area, AreaChart, CartesianGrid, Label, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const StatisticsToday = ({ width }) => {
    const { currentTheme } = useContext(ThemeContext);

    const useStyles = makeStyles((theme) => ({
        contStatistics: {
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : '',
            width: width === 'lg' ? '26vw' : width === 'xl' ? '25vw' : width === 'md' ? '91vw' : width === 'sm' ? '91vw' : '91vw',
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
            <AreaChart width={width === 'xs' ? 100 : 200} height={100} data={dataLine}
                margin={{ left: 10 }}
            >
                <defs>
                    <linearGradient id="MyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="rgba(0, 136, 254, 0.8)" />
                        <stop offset="95%" stopColor="rgba(0, 136, 254, 0)" />
                    </linearGradient>
                </defs>
                {/* <Tooltip /> */}
                <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#0088FE"
                    strokeWidth="2"
                    fillOpacity="1"
                    fill="url(#MyGradient)"
                    dot
                />
            </AreaChart>
        )
    }

    const classes = useStyles();

    return (
        <>
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100vw'
            }}>
                <Typography variant="h5" style={{
                    color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                    width: '100vw',
                    paddingBottom: '20px',
                    marginLeft:'10px'
                }}>
                    Сегодняшняя статистика
              </Typography>
                <Box style={{
                    maxWidth: width === 'xs' ? '90vw' : width === 'sm' ? '80vw' : width === 'md' ? '86vw' : width === 'lg' ? '90vw' : '90vw',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap'
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
                            <Typography variant='h4'>1240</Typography>
                            <Typography variant='h6'>Транзакций</Typography>
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
                            <Typography variant='h4'>$256.12</Typography>
                            <Typography variant='h6'>Доход</Typography>
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
                            <Typography variant='h4'>$56.12</Typography>
                            <Typography variant='h6'>Результат</Typography>
                        </Box>
                        <Box>{createLine}</Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default withWidth()(StatisticsToday);