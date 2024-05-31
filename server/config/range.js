module.exports = (req,res, next) => {

    // res.header ('Access-Control-Expose-Headers', "X-Total-Count")
      res.header ("Content-Range","items 0-20/20")
    // res.setHeader ()
    console.log(res);
    next()
  }