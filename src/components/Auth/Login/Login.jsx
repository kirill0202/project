import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import withWidth from "@material-ui/core/withWidth";
import { TextField, makeStyles, Box, Typography, Paper, Icon, IconButton, withStyles, createStyles} from "@material-ui/core";
import { Visibility, VisibilityOff, People, Close } from '@material-ui/icons';
import Snackbar from 'node-snackbar';
import { Redirect, Route, Switch, useHistory, NavLink } from "react-router-dom";
import { ThemeContext } from "../../../context/themeContext";
import Cookies from 'js-cookie';
import { setData, setLogin } from "../../../actions/actions";

const CssTextField = withStyles({
  root: {
    '& .MuiFormHelperText-root':{
      backgroundColor:'rgb(12, 12, 27)'
    },
    '& .MuiInputBase-input': {
      color: '#7575a3',
      height:'28px',
      backgroundColor:'#232135',
      padding:'8px'  
    },
    // '& .MuiInputBase-input:focus': {
    //   outline:'2px solid #7575a3'
    // },
    '& .MuiInput-underline:hover': {
      outline:'2px solid #7575a3'
    },
    '& .MuiInput-underline:after': {
      display:'none',
      borderBottomColor: '#7575a3',
    },
    '& .MuiInput-underline:focus-within': {
      outline:'2px solid #7575a3'
    },
    '& .MuiInput-underline:before': {
      display:'none',
      borderBottomColor: '#7575a3',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#7575a3',
      },
      '&:hover fieldset': {
        borderColor: '#7575a3',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#7575a3',
      },
    },
  },
})(TextField);

const CssTextField2 = withStyles({
  root: {
    '& .MuiInputBase-input': {
      height:'28px',  
      padding:'8px'  
    },
    // '& .MuiInputBase-input:focus': {
    //   outline:'2px solid #78a3ff'
    // },
    '& .MuiInput-underline:hover': {
      outline:'1px solid #78a3ff'
    },
    '& .MuiInput-underline:after': {
      display:'none',
      borderBottomColor: '#78a3ff',
    },
    '& .MuiInput-underline:focus-within': {
      outline:'1px solid #78a3ff'
    },
    '& .MuiInput-underline:before': {
      display:'none',
      borderBottomColor: '#78a3ff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#78a3ff',
      },
      '&:hover fieldset': {
        borderColor: '#78a3ff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#78a3ff',
      },
    },
  },
})(TextField);

const useStyles = makeStyles(theme =>({
  logButt:{
    '&:hover':{
      backgroundColor:'#42baf9!important'
    }
  }
}));

const Login = ({ width }) => {

  const dispatch = useDispatch();
  const myHistory = useHistory()
  const isLogin = useSelector(state => state.isLogin);

  if (Cookies.get('token')) {
    console.log('oop')
    if (!isLogin) {
      console.log('oop')
      dispatch(setLogin())
      dispatch(setData({
        token: Cookies.get('token'),
        level: Cookies.get('level'),
      }))
    }
    myHistory.push('/dashboard');
  }

  console.log(width)
  const [mess, setMess] = useState('');
  const [vis, setVis] = useState(false);
  const { currentTheme } = useContext(ThemeContext);

  const auth = async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const pass = document.querySelector('#pass').value;
    const data = {
      "username": name,
      "password": pass
    };
    console.log(data)
    await fetch('https://secure.platinumpay.cc/dashboard/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        return res.json()
      })
      .then(userData => {
        console.log(userData)
        if (userData.result) {
          Cookies.set('token',userData.response.access_token,{path:'/',sameSite: 'strict',expires:360000});
          Cookies.set('level',userData.response.level,{path:'/',sameSite: 'strict',expires:360000});
          dispatch(setData({
            token:userData.response.access_token,
            level:userData.response.level
          }))
          dispatch(setLogin())
          showMess('Авторизация прошла успешно!');
          myHistory.push('/dashboard')
        }
        else {
          showMess('Что-то пошло не так, попробуйте еще раз.')
        }
      })
  }

  const showMess = (message)=>{
    Snackbar.show({
      actionTextColor: '#7575a3', 
      text: message,
      actionText: 'ОК',
      pos: 'bottom-right'
    });
  }

  const classes = useStyles();

  return (
    <>
      <Box
        className='animate__animated animate__fadeInDown'
        style={{
          overflow:'hidden',
          position: 'absolute',
          top: '0px',
          left: '0px',
          right: '0xp',
          bottom: '0px',
          width: '100%',
          height: '100%',
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: currentTheme === 'light' ? 'white' : 'rgb(20, 19, 34)',
          zIndex: '999',
        }}>
        <Paper
          style={{
            zIndex: '99999',
            padding: '35px 30px',
            display: "flex",
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: '8px',
            maxWidth: width === 'xs' ? '80%' : width === "sm" ? '60%' : width === "md" ? '40%' : '450px',
            minHeight: '350px',
            position: 'relative',
            marginTop: '110px',
            marginBottom: '40px',
            backgroundColor: currentTheme === 'dark' ? '#141322' : '',
            boxShadow: 'none',
            border: 'none'
          }}>
          <Box style={{
            width:'100%',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center'
          }}>
            <Typography variant="h5" style={{
            width: '100%',
            color: currentTheme === 'dark' ? '#7575a3' : ''
          }}>
            Авторизация
          </Typography>
          <NavLink
            to="/"
            exact
            style={{
              color: 'red!important',
              border: '0px',
              cursor: 'pointer',
              fontSize: '20px',
              fontWeight: 'bold',
              textDecoration: 'none',
              zIndex: '99999'
            }}
          >
            <IconButton >
              <Close style={{
                color: currentTheme === 'dark' ? '#7575a3' : '#3f51b5'
              }}></Close>
            </IconButton>
          </NavLink>

          
          </Box>
          <Box style={{
            position: 'relative',
            width: '100%'
          }}>
            {currentTheme === 'dark' ?
              <CssTextField
                InputProps={{ className: classes.root }}
                id="name"
                placeholder="Введите имя пользователя"
                required
                style={{
                  margin: '30px 0px 10px 0px',
                  width: '264px',
                  backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                  width: '100%'
                }}
              />
              :
              <CssTextField2
                InputProps={{ className: classes.root }}
                id="name"
                placeholder="Введите имя пользователя"
                required
                style={{
                  margin: '30px 0px 10px 0px',
                  width: '264px',
                  backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                  width: '100%'
                }}
              />}
            <Icon style={{
              position: 'absolute',
              right: "10px",
              top: '42px',
              color: currentTheme === 'dark' ? '#aeaee0!important' : '',
            }}
            >
              <People
                style={{
                  color: currentTheme === 'dark' ? '#aeaee0' : ''
                }}></People>
            </Icon>
          </Box>
          <Box style={{
            position: 'relative',
            width: '100%'
          }}>
            {currentTheme === 'dark' ?
              <CssTextField
                InputProps={{ className: classes.root }}
                id="pass"
                placeholder="Введите пароль"
                required
                style={{
                  margin: '10px 0px',
                  width: '264px',
                  backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                  color: currentTheme === 'dark' ? '#aeaee0' : '',
                  width: '100%'
                }}
                type={!vis ? 'password' : ''}
              />
              :
              <CssTextField2
                InputProps={{ className: classes.root }}
                id="pass"
                placeholder="Введите пароль"
                required
                style={{
                  margin: '10px 0px',
                  width: '264px',
                  backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                  color: currentTheme === 'dark' ? '#aeaee0' : '',
                  width: '100%'
                }}
                type={!vis ? 'password' : ''}
              />}
            {!vis ?
              <IconButton style={{
                position: 'absolute',
                right: "-2px",
                top: '9px',
              }}
                onClick={() => { setVis(!vis) }}
              >
                <Visibility style={{
                  color: currentTheme === 'dark' ? '#aeaee0' : ''
                }}></Visibility>
              </IconButton>
              :
              <IconButton style={{
                position: 'absolute',
                right: "-2px",
                top: '9px',
              }}
                onClick={() => { setVis(!vis) }}
              >
                <VisibilityOff style={{
                  color: currentTheme === 'dark' ? '#aeaee0' : ''
                }}></VisibilityOff>
              </IconButton>
            }
          </Box>
          <Button 
          className={classes.logButt}
            variant="contained"
            style={{
              color:'white',
              backgroundColor: 'rgb(75, 124, 243)',
              marginTop: '10px',
              borderRadius: '2px',
              fontSize: '15px',
              height: '45px',
              width: '100%',
              border:'0px'
            }}
            onClick={auth}
          >
            Войти
            </Button>
          <Box style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center'
          }}>
            {/* <a
              className='forPass'
              style={{
                color: '#4b7cf3',
                border: '0px',
                margin: '15px 0px ',
                cursor: 'pointer',
                fontSize: '15px',
                width: '100%',
                display: 'flex',

              }}
            >
              Забыли пароль?
            </a> */}
            <NavLink
              to="/register"
              exact
              style={{
                color: 'rgb(75, 124, 243)',
                border: '0px',
                margin: '15px 0px ',
                cursor: 'pointer',
                fontSize: '15px',
                width: '100%',
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              Зарегистрироваться
            </NavLink>
          </Box>

        </Paper>
      </Box>
    </>
  );
};

export default withWidth()(Login);