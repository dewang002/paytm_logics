const { Router } = require("express");
const { User, Account } = require("../db/db");
const { authMiddleware } = require("../Middleware/middleware");
const zod = require("zod");
const { JWT_KEY } = require("../config");
const jwt = require("jsonwebtoken");
const router = Router();

const signupBody = zod.object({
  email: zod.string(),
  password: zod.string().min(6),
  name: zod.string(),
});

const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

const updateBody = zod.object({
  name: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.send("something wend wrong");
  }
  const existingUser = await User.findOne({
    email: req.body.email,
  });
  if (existingUser) {
    return res.send("user already exist , try something else");
  }

  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  });

  await Account.create({
    userId:user._id,
    balance:Math.floor(Math.random()*1000)
  })

  const token = jwt.sign(
    {
      userId:user._id,
    },
    JWT_KEY
  );
  res.status(201).json({ message: "User created", token });
});


router.post('/signin',async(req,res)=>{
    const {success} = signinBody(req.body)
    if(!success){
        return res.send("wrong inputs, please try again")
    }

    const user = User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_KEY)
       return res.json({token:token})
    }else{
        return res.send("user not found")
    }
    
})

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(411).send("did not found");
  }
  await User.updateOne(req.body, {
    id: req.userId,
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  try {
    const user = User.find({
        name:{
            $regex:filter
        }
    })
    res.json({
      user: user.map((elem) => ({ 
        name: elem.name,
        email: elem.email,
        _id: elem._id
       })),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
