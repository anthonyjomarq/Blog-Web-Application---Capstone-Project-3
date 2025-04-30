import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import expressEjsLayouts from "express-ejs-layouts";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressEjsLayouts);

// View engine setup
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "layout");

// In-memory storage for posts
let posts = [];

// Helper function to render with common variables
function renderPage(res, template, data = {}) {
  const pageData = {
    ...data,
    hasLightbox: ["tournaments", "news", "jerseys"].includes(
      data.currentSection
    ),
  };
  res.render(template, pageData);
}

// Routes
app.get("/", (req, res) => {
  renderPage(res, "index", {
    posts,
    currentSection: "home",
    pageTitle: "Home - Anthony Esports Blog",
  });
});

app.get("/create", (req, res) => {
  renderPage(res, "create", {
    currentSection: "home",
    pageTitle: "Create Post - Anthony Esports Blog",
    formData: {}, // Ensure formData is defined
  });
});

app.post("/create", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    renderPage(res, "create", {
      error: "Title and content are required",
      currentSection: "home",
      pageTitle: "Create Post - Anthony Esports Blog",
      formData: { title, content },
    });
  } else {
    const id = uuidv4();
    posts.push({ id, title, content });
    res.redirect("/");
  }
});

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const post = posts.find((post) => post.id === id);
  if (post) {
    renderPage(res, "edit", {
      post,
      currentSection: "home",
      pageTitle: `Edit Post - ${post.title} - Anthony Esports Blog`,
      formData: {}, // Ensure formData is defined
    });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  if (!title || !content) {
    const post = posts.find((post) => post.id === id);
    if (post) {
      renderPage(res, "edit", {
        post,
        error: "Title and content are required",
        currentSection: "home",
        pageTitle: `Edit Post - ${post.title} - Anthony Esports Blog`,
        formData: { title, content },
      });
    } else {
      res.status(404).send("Post not found");
    }
  } else {
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex !== -1) {
      posts[postIndex] = { id, title, content };
      res.redirect("/");
    } else {
      res.status(404).send("Post not found");
    }
  }
});

app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  posts = posts.filter((post) => post.id !== id);
  res.redirect("/");
});

// Content pages
app.get("/tournaments", (req, res) => {
  renderPage(res, "tournaments", {
    currentSection: "tournaments",
    pageTitle: "Tournaments - Anthony Esports Blog",
  });
});

app.get("/jerseys", (req, res) => {
  renderPage(res, "jerseys", {
    currentSection: "jerseys",
    pageTitle: "Jerseys - Anthony Esports Blog",
  });
});

app.get("/news", (req, res) => {
  renderPage(res, "news", {
    currentSection: "news",
    pageTitle: "News - Anthony Esports Blog",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
