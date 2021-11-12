import { Response, Request } from 'express'
import { apiConfig } from './api-config'
import { User, users } from './users'

import * as jwt from 'jsonwebtoken'

const handleAuthentication = (req: Request, res: Response) =>{
    const user: User = req.body
    if(isValid(user)){
        const dbUser: User = users[user.email]
        const token = jwt.sign(
            {
                sub: dbUser.email,
                iss: apiConfig.secret
            },
            'shooting-password'
        )
        res.json(
            {
                name:dbUser.name,
                email:dbUser.email,
                accessToken: token
            }
        )
    }else{
        res.status(403).json({message: 'Dados inválidos.'})
    }
}

function isValid(user: User): boolean{
    if(!user){
    return false
    }
    const dbUser = users[user.email]
    return dbUser !== undefined && dbUser.matches(user)
}

export { handleAuthentication }