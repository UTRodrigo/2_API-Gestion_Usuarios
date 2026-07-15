const appTokenVerification = (req, res, next) => {
    const token = req.header("app-token");
    if(!token || token !== process.env.APP_TOKEN)
    {
        return res.status(401).json({msg: "Unauthorized"});
    }

    next();
};

module.exports = appTokenVerification;