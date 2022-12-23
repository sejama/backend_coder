import { Router } from "express";
import passport from "passport";
import { AuthControllers } from "../../controllers/AuthController/index.js";

const router = Router()

//INDEX

router.get('/', (req, res) => {
    res.render('home')
})

//LOGIN
router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('login', { failureRedirect: "/api/auth/login-error" }), async (req, res) => {
    const { email } = req.body
    res.render('welcome', { email })
})


//SIGNUP
router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', AuthControllers.signUp, async (req, res) => {
    res.redirect('/login')
})

//LOGOUT
router.get('/logout', (req, res) => {
    const { email } = req.body
    res.render('logout', { email })
})

//ERROR
router.get('/login-error', (req, res) => {
    // res.send({ success: false, message: 'error in login/signup' })
    res.render('login-error.hbs')
})

router.get('/signup-error', (req, res) => {
    res.render('user-exists.hbs')
})


//WELCOME
router.get('/welcome', (req, res) => {
    res.render('welcome', {})
})


//GITHUB
router.get('/github-login', passport.authenticate('github'), AuthControllers.githubLogin)

router.get('/github', passport.authenticate('github'), (req, res) => {
    res.send(req.user)
})

export { router as AuthRouter }