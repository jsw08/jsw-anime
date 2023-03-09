const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
const BASEURL = process.env.allanimeBaseurl

app.use(express.json());

// routes
app.get("/anime/search/:query", (req, res) => {
    try {
        fetch(`https://api.allanime.to/allanimeapi?variables={"search":{"allowAdult":true,"allowUnknown":false,"query":"${req.params.query}"},"limit":25,"page":1,"translationType":"sub","countryOrigin":"ALL"}&extensions={"persistedQuery":{"version":1,"sha256Hash":"c4305f3918591071dfecd081da12243725364f6b7dd92072df09d915e390b1b7"}}`, {
        }).then(v => v.json()).then(v => {
            res.json({
                "shows": v.data.shows.edges
            })
        })
    } catch (e) {
        console.info("Something went wrong with the allanimeapi.")
        fetch('https://ntfy.sh/jswallanimeapi', {
            method: 'POST', 
            body: e,
            title: "Something went wrong, allanimeapi" 
        })

    }
})


app.listen(PORT)
console.info(`Started app at port: ${PORT}`)
