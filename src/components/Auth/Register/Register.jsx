import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import withWidth from "@material-ui/core/withWidth";
import { TextField, makeStyles, Box, Typography, Paper, IconButton, Icon, withStyles, createStyles } from "@material-ui/core";
import { Visibility, VisibilityOff, People, Close } from '@material-ui/icons';
import { NavLink, useHistory } from "react-router-dom";
import Snackbar from 'node-snackbar';
import { ThemeContext } from "../../../context/themeContext";
import Cookies from 'js-cookie';
import { setData, setLogin } from "../../../actions/actions";


const CssTextField = withStyles({
  root: {
    '& .MuiFormHelperText-root':{
      backgroundColor:'rgb(20, 19, 34)',
      margin:'0px',
      position:'absolute',
      bottom:'-21px',
      left:'0px'
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
    '& .MuiFormHelperText-root':{
      margin:'0px',
      position:'absolute',
      bottom:'-21px',
      left:'0px'
    },
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



const Register = ({ width }) => {
  const { currentTheme } = useContext(ThemeContext);
  const [mess, setMess] = useState('');
  const [vis, setVis] = useState(false);
  const [err, setErr] = useState({
    name: '',
    pass: ''

  });

  const dispatch = useDispatch();
  const myHistory = useHistory()
  const isLogin = useSelector(state => state.isLogin);

  if (Cookies.get('token')) {
    if (!isLogin) {
      dispatch(setLogin())
      dispatch(setData({
        token: Cookies.get('token'),
        level: Cookies.get('level'),
      }))
    }
    myHistory.push('/dashboard');
  }

  const useStyles = makeStyles(theme =>({
    regButt:{
      '&:hover':{
        backgroundColor:'#42baf9!important'
      }
    }
  }));

  const checkErrorName = (e) => {
    setErr({ ...err, name: '' })
    let value = e.target.value;


    const containsLetters = /^.*[a-zA-Z0-9]+.*$/
    const notContainsLetters = /^.*[а-яА-Я]+.*$/

    if(!value) {
      setErr({ ...err, name: 'Введите имя пользователя' })
      return
    }
    if (
      notContainsLetters.test(value)
     ) {
      setErr({ ...err, name: 'Русская раскладка запрещена!' })
    } else {
      setErr({ ...err, name: '' })
    }

  }

  const checkErrorPass = (e) => {
    setErr({ ...err, pass: '' })
    let value = e.target.value;


    const containsLetters = /^.*[a-zA-Z0-9]+.*$/
    const notContainsLetters = /^.*[а-яА-Я]+.*$/

    if(!value) {
      setErr({ ...err, pass: 'Введите ваш пароль' })
    return
    }
    if (
      notContainsLetters.test(value)
    ) {
      setErr({ ...err, pass: 'Русская раскладка запрещена!' })
    } else {
      setErr({ ...err, pass: '' })
    }
  }



  const registration = async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const pass = document.querySelector('#pass').value;
    const data = {
      "username": name,
      "password": pass
    };
    console.log(data)
    await fetch('https://secure.platinumpay.cc/dashboard/register', {
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
          showMess('Вы успешно зарегистрировались!')
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
          zIndex: '999',
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
          backgroundColor: currentTheme === 'light' ? 'white' : '#141322',
          fontFamily:'Mukta",sans-serif'
        }}>
        {/* <Typography variant='h4' style={{
          marginBottom:'40px',
          marginTop: width === 'xs' ? '40%' : '0px',
          color: currentTheme === 'dark' ? '#aeaee0' : ''
        }}>
          Добро пожаловать
        </Typography> */}
        <Paper
          style={{
            zIndex: '99999',
            padding: '40px 30px',
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
            Регистрация
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
                onChange={checkErrorName}
                required
                error={Boolean(err.name)}
                helperText={err.name}
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
                onChange={checkErrorName}
                required
                error={Boolean(err.name)}
                helperText={err.name}
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
                onChange={checkErrorPass}
                required
                error={Boolean(err.pass)}
                helperText={err.pass}
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
                onChange={checkErrorPass}
                required
                error={Boolean(err.pass)}
                helperText={err.pass}
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
                top: '9px'
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
            type='submit'
            variant="contained"
            className={classes.regButt}
            style={{
              color:'white',
              backgroundColor: 'rgb(75, 124, 243)',
              marginTop: '20px',
              borderRadius: '2px',
              fontSize: '15px',
              height: '45px',
              width: '100%'
            }}
            onClick={err.pass || err.name ? null : registration}
          >
            Зарегистрироваться
            </Button>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%'
            }}
          >
            <NavLink
              to="/login"
              exact
              style={{
                color: 'rgb(75, 124, 243)',
                border: '0px',
                margin: '15px 0px ',
                cursor: 'pointer',
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              Уже есть аккаунт?
            </NavLink>
          </Box>
        </Paper>

      </Box>
    </>
  );
};
export default withWidth()(Register);