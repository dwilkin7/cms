var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Message = require('../models/message');
const { error } = require('protractor');

function returnError(res, error) {
    res
    .status(500)
    .json({
        message: 'An error occurred',
        error: error
    });
}

router.get('/', (req, res, next) => {
    Message.find()
    //
    .populate('group')
    .then(messages => {
        res
        .status(200)
        .json({
            message: 'Messages fetched successfully!',
            messages: messages
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});


router.get('/:id', (req, res, next) => {
    Message.findOne({
        "id": req.params.id
    })
    .populate('group')
    .then(message => {
        res.status(200).json({
            message: 'Message fetched successfully!',
            message: message
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});


router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");

    const message = new Message({
        id: maxMessageId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    });

    message.save()
        .then(createdMessage => {
            res
              .status(201)
              .json({
                  message: 'Message added successfully!',
                  message: createdMessage
              });
        })
        .catch(error => {
            returnError(res, error);
        });
    });


router.put('/:id', (req, res, next) => {
    Message.findOne({
        id: req.params.id
    })
    .then(message => {
        message.name = req.body.name;
        message.description = req.body.description;
        message.url = req.body.url;
       

        Message.updateOne({
            id: req.params.id
        }, message)
        .then(result => {
            res
            .status(204)
            .json({
                message: 'Message updated successfully!'
            })
        })
        .catch(error => {
            returnError(res, error);
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});


router.delete("/:id", (req, res, next) => {
    Message.findOne({
        id: req.params.id
    })
    .then(message => {
        Message.deleteOne({
            id: req.params.id
        })
        .then(result => {
            res
            .status(204)
            .json({
                message: "Message deleted successfully!"
        });
    })
    .catch(error => {
        returnError(res, error);
    })
})
.catch(error => {
    returnError(res, error);
    });
});

module.exports = router;