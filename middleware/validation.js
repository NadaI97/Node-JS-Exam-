dataMethoud = ['body', 'params', 'query'];


const validation= (schema)=>{

    return (req, res,next)=>{

        const validationErrArr = []

        dataMethoud.forEach(key => {

            if (schema[key]) {
            
              const validationResults =schema[key].validate(req[key], {abortEarly: false});

              if (validationResults.error){

                validationErrArr.push(validationResults.error.details)
              }
            }
            
        })

        if (validationErrArr.length) {
            
            res.json({ message: "validation error", err: validationErrArr})

            
        } else {
            next()
        }
    }
}


module.exports = validation