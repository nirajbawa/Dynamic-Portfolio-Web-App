class PageNotFound{
    async getHome(req, res){
            res.render("404");
    }
}



module.exports = PageNotFound;