const router = require('express').Router();
const mixApi = require('../api/mixApi');
const parametersApi = require('../api/parametersApi');
const Message = require('../models/MessageSchema');

router.get('/', (req, res, next) => res.send('Welcome to API Page').status(200));

router.get('/mix', (req, res, next) => {
    if (req.query.complete != 'true') {
        console.log(req.query)
        return mixApi.getSimple(req.query.date, (err, data) => res.json(data));
    } else {
        return mixApi.getComplete( (err, data) => res.json(data));
    }
});

router.get('/mix/entrance', (req, res, next) => {
    if (!req.query){
        return mixApi.getEntrance(null, (err, data) => {
            return res.json(data);
        })
    }else{
        return mixApi.getEntrance(req.query, (err, data) => {
            return res.json(data);
        })
    }    
});

router.get('/parameters/:popid', (req, res, next) => {

    if (req.params.popid != null) {
        parametersApi.getComplete(
            req.params.popid, req.query.station, req.query.position, (err, data) => {
               return  res.json(data)
            });
    } else {
        return res.json("Please provide a valid Popid").status(401);
    }

});




router.route('/messages')
    .get((req, res, next) => {
        Message.find({}, (err, data) => {
            res.json(data);
        })
    })
    .post((req, res, next) => {
        let message = new Message(req.body);
        message.save((err) => {
            if (err) {
                return next(err);
            }
            res.json(message).status(200);
        });
    })

router.route('/messages/deleteall')
    .get((req, res, next) => {
        Message.remove({}, (err) => {
            if (err) {
                return next(err);
            }
            return res.json("All messages have been deleted");
        })
    })

router.route('/messages/:id')
    .get((req, res, next) => {
        Message.find({ _id: req.params.id }, (err, data) => {
            res.json(data);
        });
    })
    .put((req, res, next) => {
        let curr = req.body;
        let id = req.params.id;
        Message.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
            if (err) console.error(err)
            Message.findById(id, (err, data) => res.json(data))
        })
    })
    .delete((req, res, next) => {
        Message.remove({ _id: req.params.id }, (err) => {
            if (err) {
                return next(err);
            }
            res.json('message deleted');
        })
    })



module.exports = router;