const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan"); // Assuming you're using morgan for logging
const jwt = require("jsonwebtoken");
const path = require("path");
// Load environment variables from .env file
dotenv.config();

// Import DB connection
const connectDB = require("./config/db");
const { title } = require("process");

// Initialize the Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(morgan("dev"));

// Body parsing middleware for JSON
app.use(express.json());

// Connect to the database
connectDB();

// Routes for authentication (assuming userRoutes is properly set up)
app.use("/api/v1/auth", require("./routes/userRoutes"));

// Define the port (either from .env or default to 3000)
const port = process.env.PORT || 3000;

// Middleware to serve static files (images)
app.use("/images", express.static(path.join(__dirname, "image")));

// API endpoint to get image URLs and descriptions
app.get("/api/images", (req, res) => {
  const images = [
    {
      title: "Demon Slayer",
      url: "/images/demonslayer.png",
      description:
        "Demon Slayer: Kimetsu no Yaiba is a Japanese anime series based on the manga of the same name by Koyoharu Gotouge. It follows the story of Tanjiro Kamado, a young boy who becomes a demon slayer after his family is slaughtered and his sister turns into a demon.",
      rating: 4.8,
      category: "Adventure fiction, Dark Fantasy, Martial Art",
    },
    {
      title: "Attack on Titan",
      url: "/images/aot.jpeg",
      description:
        "Attack on Titan (Shingeki no Kyojin) is a dark fantasy anime series set in a post-apocalyptic world where humanity is under threat from giant humanoid creatures called Titans.",
      rating: 5,
      category: "Horror, Mystery, Action",
    },
    {
      title: "Jujutsu Kaisen",
      url: "/images/jujutsu.jpg",
      description:
        "Jujutsu Kaisen is a dark fantasy anime series based on the manga of the same name by Gege Akutami. It follows the story of Yuji Itadori, a high school student who becomes involved in a secret world of Jujutsu Sorcerers.",
      rating: 5,
      category: "Sci-Fi, Comedy, Romance, History",
    },
  ];
  res.json(images);
});

app.get("/api/images3", (req, res) => {
  const images = [
    { 
      url: "/images/goju.jpg",     
    },
    { 
      url: "/images/naruto.png",
    },
    {   
      url: "/images/tanjiro.jpg",   
    },
  ];
  res.json(images);
});


app.get("/api/images2", (req, res) => {
  const images = [
    {
      title: "Demon Slayer",
      url: "/images/demonslayer.png",
      description:
        "Demon Slayer: Kimetsu no Yaiba is a Japanese anime series based on the manga of the same name by Koyoharu Gotouge. It follows the story of Tanjiro Kamado, a young boy who becomes a demon slayer after his family is slaughtered and his sister turns into a demon.",
      rating: 4.8,
      category: "Adventure fiction, Dark Fantasy, Martial Art",
      episodes: [
        {
          url: "/images/dslayer_.jpg",
          title: "Looking for the man",
          description: "Tanjiro's first steps as a Demon Slayer."
        },
        {
          url: "/images/dslayer_2.jpg",
          title: "Looking for the woman",
          description: "The quest to save his sister."
        },
        {
          url: "/images/dslayer_3.jpg",
          title: "Looking for myself",
          description: "Tanjiro confronts his fears."
        }
      ]
    },
    {
      title: "Attack on Titan",
      url: "/images/aot.jpeg",
      description:
        "Attack on Titan (Shingeki no Kyojin) is a dark fantasy anime series set in a post-apocalyptic world where humanity is under threat from giant humanoid creatures called Titans.",
      rating: 5,
      category: "Horror, Mystery, Action",
      episodes: [
        {
          url: "/images/aot_ep1.jpg",
          title: "The Fall of Shiganshina",
          description: "The Titans invade."
        },
        {
          url: "/images/aot_ep2.jpg",
          title: "The Struggle for Trost",
          description: "Humanity fights back."
        },
        {
          url: "/images/aot_ep3.jpg",
          title: "The Female Titan",
          description: "A new threat emerges."
        }
      ]
    },
    {
      title: "Jujutsu Kaisen",
      url: "/images/jujutsu.jpg",
      description:
        "Jujutsu Kaisen is a dark fantasy anime series based on the manga of the same name by Gege Akutami. It follows the story of Yuji Itadori, a high school student who becomes involved in a secret world of Jujutsu Sorcerers.",
      rating: 5,
      category: "Sci-Fi, Comedy, Romance, History",
      episodes: [
        {
          url: "/images/jk_ep1.jpg",
          title: "Introduction to Jujutsu",
          description: "Yuji enters the world of curses."
        },
        {
          url: "/images/jk_ep2.jpg",
          title: "The Cursed Child",
          description: "Yuji faces his first curse."
        },
        {
          url: "/images/jk_ep3.jpg",
          title: "The Shibuya Incident",
          description: "Chaos unfolds in Shibuya."
        }
      ]
    },
  ];
  res.json(images);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
