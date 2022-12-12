import { Router } from "express"
import passport from 'passport'
import { UserDao } from '../../dao/index.js'

const router = Router()

router.post('/signup', async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body
        if(!name || !lastname || !email || !password) return res.send({ success: false })
        
        const existUser = await UserDao.getOne({ email })
        
        if(existUser && existUser.password) return res.send({ success: false, error: 'el usuario ya existe' })

        if(existUser && !existUser.password){
            const updateUser = await UserDao.updateById(existUser._id, {...existUser, password} )
            res.send({success: true})
        }

        await UserDao.save({name, lastname, email, password})

        res.send({success: true})
    } catch (error) {
        console.log(error)
        res.send({success: false})
    }
})

router.post('/', passport.authenticate('login'), async (req, res) => {
    res.send({success: true, message: 'Welcome,', user: req.user})
})

router.get('/github-login', passport.authenticate('github'), (req, res) =>{
    res.send('Holaaaaa github')
})

router.get('/github', passport.authenticate('github'), (req, res) =>{
    res.send(req.user)
})



export { router as AuthRouter}