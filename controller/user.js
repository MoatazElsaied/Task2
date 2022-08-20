const {ObjectId} = require("mongodb")
const connection = require("../database/connect")
class articlefun {
    static addPost = (req,res) => {
        res.render("addPost", {pageTitle:"add new article"})
    }
    static addPostLogic = (req, res) =>{
        connection((err, db)=>{
            if(err) return res.render("/err404")
            db.collection("art").insertOne(req.body)
            .then(()=>res.redirect("/"))
            .catch(e=> res.redirect("/err404"))
        }) 
    }
    static all = (req, res)=>{
        connection((err, db)=>{
            db.collection("art").find()
            .toArray((e, articles)=>{
                if(e) return res.render("err404")
                res.render("all", {
                    pageTitle:"all articles",
                    articles
                })
            })
        })
    } 

        static single = (req, res)=>{
        const articleId = req.params.id
        connection((err, db)=>{
            if(err) return res.send(err.message)
            db.collection("art").findOne({_id:new ObjectId(articleId)})
            .then(article=> {
                res.render("single", {pageTitle:"single article", article})
            })
            .catch(e=> res.send(e.message))
        })
    }
    static del = (req, res)=>{
        const articleId = req.params.id
        connection((err, db)=>{
            if(err) return res.send(err.message)
            db.collection("art").deleteOne({_id:new ObjectId(articleId)})
            .then(article=> {
                res.redirect("/")
            })
            .catch(e=> res.send(e.message))
        })
    }
        }
        
module.exports=articlefun
