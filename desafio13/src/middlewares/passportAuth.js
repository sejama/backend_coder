import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { UserDao } from '../dao/index.js'
import fs from 'fs'

const init = () => {

    passport.serializeUser((user,done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id,done) => {
        const user = await UserDao.getByid(id)
        done(null, user)
    })


    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqtoCallback: true
    }, async (req, email, password, done) => {
        try {
            if(!email || !password) return done(null, false)

            const user = await UserDao.getOne({email: email})
        
            if(!user || user.password !== password) return done(null, false)

            const userResponse = {
                id: user._id,
                email: email,
                cart: user.cart
            }

            done(null, userResponse)
        } catch (error) {
            console.log(error)
            done(error)
        }
    }))

    passport.use('login', new GitHubStrategy({
        clientID: 'Iv1.e8436a2922d54a4f',
        clientSecret: 'ee85a201b297457a6e0c847e78d3de7590bedb45',
        callbackURL: 'http://localhost:8080/api/auth/github',
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            //fs.writeFileSync('./profile.js', JSON.stringify(profile,null, 3))
            const githubEmail = profile.emails?.[0].value
            if(!githubEmail) return done(null,false)
            
            const user = await UserDao.getOne({email: githubEmail})
            if(user){
                const userResponse = {
                    id: user._id,
                    email: user.email,
                    cart: user.cart
                }
            }else{
                const newUser = {
                    email: githubEmail,
                    name: profile._json.name,
                    lastname: '-'
                }

                const createUser = await UserDao.save(newUser)

                const userResponse = {
                    id: createUser._id,
                    email: createUser.email,
                    cart: createUser.cart
                }
            }

            done(null, userResponse)
        } catch (error) {
            console.log(error)
            done(error)
        }
    }))
}

export const PassportAuth = {
    init
}