module.exports.home = function(request,response){
    // return response.end('<h1>Express is up for Codeial - Home Controller</h1>')
    console.log(request.cookies);
    return response.render('home',{
        "title":"Codeial"
    })
}

