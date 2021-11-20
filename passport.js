const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=process.env.KEY_SECRET;
opts.issuer=process.env.ISSUER;
opts.audience = process.env.AUDIENCE;

module.exports = function jwtPassport(passport){
    passport.use(new JwtStrategy(opts,(jwt_payLoad,done)=>{
        console.log(jwt_payLoad)
        if(jwt_payLoad.nameRole  === "admin"){
            const test ={message:"ok"}
            return done(null,test)
        }else{
            return done(null,{message:"error"})
        }
   }))
}

