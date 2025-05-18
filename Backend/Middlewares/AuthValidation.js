const { z }  = require('zod')

const signupValidation = (req, res, next) =>{
    const requiredBody = z.object({
        name: z.string().min(3).max(100),
        email: z.string().email(),
        password: z.string().min(3).max(100)

    })
    const result = requiredBody.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({
            message: "incorrect format",
            error: result.error
        })
        
    }
    next()
}

const loginValidation =(req, res, next)=>{
    const requiredBody = z.object({
        
        email: z.string().email(),
        password: z.string().min(3).max(100)

    })
    const result = requiredBody.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({
            message: "incorrect format",
            error: result.error
        })
        
    }
    next()

}

module.exports = {
    signupValidation,
    loginValidation
}