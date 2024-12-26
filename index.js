
const express = require("express") // Import the Express framework for building web applications.
const app = express() // Create an Express application instance.

const jwt = require("jsonwebtoken") // Import the JSON Web Token library for handling tokens.
const secretkey = "secretkey" // Define a secret key for signing and verifying JWTs.

app.get("/", (req, res) =>{ // Define a GET route for the root URL.
    res.json({ // Send a JSON response.
        message: "hii to the good part" // Include a message in the response.
    })
})

app.post("/login", (req, res) =>{ // Define a POST route for the login endpoint.
    const user={ // Define a user object with sample details.
        id:1, // Assign a unique user ID.
        username:"anil", // Assign a username.
        email:"anil@gmail.com" // Assign an email address.
    }
   jwt.sign({user}, secretkey,{expiresIn:"300s"}, (err, token)=>{ // Sign the user data into a JWT with a 300-second expiry.
    res.json({ // Send a JSON response.
        token // Include the generated token in the response.
    })
   })
})

// to verify the token 
app.post("/profile", verifyToken,(req, res)=>{ // Define a POST route for accessing the profile endpoint.
    jwt.verify(req.token, secretkey, (err,authData) =>{ // Verify the token using the secret key.
        if(err) { // Check if there is an error during verification.
            res.send({result: "invalid token"}) // Send an error message if the token is invalid.
        }
        else{ // If the token is valid:
            res.json({ // Send a JSON response.
                message: "profile accessed", // Include a success message.
                authData // Include the decoded token data.
            })
        }
    })
})

function verifyToken(req, res, next){ // Define a middleware function to extract and validate the token.
    const bearerHeader = req.headers['authorization'] // Get the Authorization header from the request.
    if(typeof bearerHeader !== "undefined"){ // Check if the header is defined.
        const bearer = bearerHeader.split(" ") // Split the header value by space to extract the token.
        const token = bearer[1] // Get the token part from the split array.
        req.token= token; // Attach the token to the request object.
        next(); // Proceed to the next middleware or route handler.
    }else{ // If the header is undefined:
        res.send({ // Send an error response.
            result: 'Token not valid' // Include an error message.
        })
    }
}

app.listen(8000, ()=>{ // Start the server on port 8000.
    console.log("port started at 8000"); // Log a message indicating the server has started.
})
