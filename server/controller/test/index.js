var express = require('express');
var router = express.Router();

router.get('/index', function(req, res, next) {
    try{
        console.log(`I am in`)
        const body = "Hello, world!";
        res.status(200).send(body)
    }
   catch(e){
    console.log(`Server met some problem ${e}`)
   }
  });
  

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


module.exports = router;
