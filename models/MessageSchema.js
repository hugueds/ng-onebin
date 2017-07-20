const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    partNumber : String,
    partName : String,
    date: { type: Date, default: Date.now },
    confirmed : {type: Boolean, default: false}
});

messageSchema.methods.updateMix = function(message, cb){	

    this.partNumber = message.partNumber;
    this.partName = message.partName;    
    this.confirmed = message.confirmed;
    this.date = message.date;   
    

	this.save((err, data) => {
		if (err) {
            return console.error(err)
        }		
		cb(data);
	});
	
};

module.exports = mongoose.model('Message', messageSchema);