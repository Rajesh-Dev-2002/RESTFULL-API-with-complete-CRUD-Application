const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const path = require("path");
const methodOverride = require("method-override")
app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

let posts = [
  {
    id: uuidv4(),
    username: "Rajesh Kumar Mohanta",
    content: "I Love Coding",
  },
  {
    id: uuidv4(),
    username: "Rakesh",
    content: "Hard work is only key to achieve success",
  },
  {
    id: uuidv4(),
    username: "Soumaya Ranjan",
    content: "Engineering Student",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  //here were use to redirect the posts file as well with redirect
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});


app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id===p.id)
    post.content = newContent;
    console.log(post)
    res.redirect("/posts")
})

app.get("/posts/:id/edit",(req,res)=>{
  let {id} = req.params;
  let post = posts.find((p)=>id === p.id)
  res.render("edit.ejs", {post})
})

app.delete("/posts/:id",(req,res)=>{
  let {id} = req.params;
   posts = posts.filter((p)=> id !== p.id)
  res.redirect("/posts")
})

let port = 3500;
app.listen(port, () => {
  console.log(`Server is running at port :- ${port}`);
});
