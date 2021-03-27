require('dotenv').config()
const { BrainlyAPI, Server } = require('brainly-api');
const express = require('express')
const app = express()

app.get('/api',(req,res) => {
    try {
        if (req.query.question !== undefined ) {
            BrainlyAPI.startWorker({ experimental: true, server: Server.ID }, async brainly => {
                let question = req.query.question
                const result = await brainly.findQuestion(question);
                let array = Array.from(result)
                let nodes = array[0].raw.node.answers.nodes
                let response = {
                    status:'success',
                    data:{
                        answer:nodes[0].content.replace( /(<([^>]+)>)/ig, '')
                    }
                }
                res.json(response)
                return;
            });       
        }else{
            res.json({
                status:'error',
                error_message:'no query detect'
            })
        }   
    } catch (error) {
        res.json({
            status:'error',
            error_message:error
        }) 
    }
})

app.listen(process.env.PORT, () => {
    console.log('server ok' + process.env.PORT)
})

