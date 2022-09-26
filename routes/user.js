var express = require('express');
const res = require('express/lib/response');
const { response } = require('../app');
var router = express.Router();
var userHelper = require('../helpers/user-helpers')

let error = false

/* GET home page. */
router.get('/', function (req, res) {

  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  if (req.session.user == true) {
    res.redirect('/home')
  } else {
    res.render('user/login', { error })
    error = false
  }
})

router.post('/login', (req, res) => {
  userHelper.doLogin(req.body,(isLogged)=>{
    if(isLogged){
      req.session.user=true;
      res.redirect('/home')
    }else{
      error = true
      res.redirect('/')
    }
  })

  })

router.get('/signup', function (req, res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  let exist = req.session.exist
  res.render('user/signup',{exist})
  req.session.exist = false 
})

router.post('/signup',(req,res)=>{
  userHelper.addUser(req.body).then((data)=>{
    if(data.exist==true){
      req.session.exist=true
      res.redirect("/signup")
    }else{
    res.redirect('/home')
    }
  })
  
})

router.post('/', function (req, res) {
  const { email } = req.body;
  userHelper.getUser(email, (data) => {
    console.log(data);
  })

})
router.get('/home', (req, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  if(req.session.user==true){
  
  
  let products = [{
    name: "Rolex",
    image: "https://www.time4diamonds.com/media/mgs_blog/3/_/3.jpeg",
    price: 200000,

  },
  {
    name: "Daniel Wellington",
    image: "https://www.danielwellington.com/product-images/Iconic_RG_Black_UGC-dRQ63g6F.png?ecom2=true&format=jpg&canvas=1:1&width=683&quality=80&bg-color=FFFFFF",
    price: 16000,
  },
  {
    name: "Hublot",
    image: "	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW-eAAGx-nhkZNQZ6axlEgSVAj8yTQ13OboQ&usqp=CAU",
    price: 1300000,
  },
  {
    name: "Casio vintage",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnNRzivTpm5nZFmTRO3NvV-ewECeN7Zla5QQ&usqp=CAU",
    price: 8000,
  },]
  res.render('user/home', { products })
}else{
    res.redirect('/')
  }
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
