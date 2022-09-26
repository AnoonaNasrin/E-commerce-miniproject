var express = require('express');
var adminHelpers = require('../helpers/admin-helpers');
const userHelpers = require('../helpers/user-helpers');


var router = express.Router();
/* GET users listing. */



router.get('/', async function (req, res) {

  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  if (req.session.admin == true) {
    const users = await adminHelpers.getAllUser()
    res.render('admin/view-users', { admin: true, users})
  } else {
    res.redirect("/admin/login")
  }
});

router.get('/delete/:id', async function (req , res) {
  const id = req.params.id
  const users = await adminHelpers.deleteUser(id)
  res.redirect('/admin')

})
router.get('/add-users', function (req, res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  if (req.session.admin == true) {
    let emexist = req.session.emexist
    res.render('admin/add-users',{emexist})
    req.session.emexist = false
  } else {
    res.redirect("/admin/login")
  }
})


router.post('/add-users',(req,res)=>{
  userHelpers.addUser(req.body).then((data)=>{
    if(data.exist==true){
      req.session.emexist=true
      res.redirect("/admin/add-users")
    }else{
    res.redirect('/admin')
    }
  })
})
router.get('/edit/:id', async (req, res) => {
  

  const id = req.params.id

  const user = await adminHelpers.getUser(id)

  console.log(user);

  res.render('admin/update-user', { user })

})
router.post('/edit/:id', async (req, res) => {
  const id = req.params.id
  const user = req.body
  const use = await adminHelpers.updateUser(id, user)
  res.redirect('/admin')

})

router.get('/login', async (req, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  
  if (req.session.admin == true) {
    const users = await adminHelpers.getAllUser()
    res.render('admin/view-users', { admin: true, users })
  } else {
    res.render('admin/admin-login')
  }

})

router.post('/login', (req, res) => {

  const emailf = "anoonanasrin@gmail.com"
  const passwordf = "2468";
  const { email, password } = req.body
  if (email == emailf && password == passwordf) {
    req.session.admin = true
    res.redirect("/admin")
  } else {
    res.redirect("/admin/login")
  }

})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/admin/login');
})


module.exports = router;
