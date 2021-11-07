const { NOMEM } = require("dns");
const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

let message = "";
const pokedex = [
    {

        numero:212,
        nome:"MegaScizor",
        tipo:"Bug, Steel",
        imagem:"/img/MegaScizor.png",
        descricao:"It stores the excess energy from Mega Evolution, so after a long time passes, its body starts to melt.",
        altura:2,
        peso:125,
        categoria:"Pincer",
        habilidade:"Technician",
    },
    {   
        numero:23,
        nome:"Ekans",
        tipo:"Poison",
        imagem:"/img/ekans.png",
        descricao:"The older it gets, the longer it grows. At night, it wraps its long body around tree branches to rest.",
        altura:2,
        peso:6.9,
        categoria:"Snake",
        habilidade:"Shed Skin, Intimidate",
    },
    {
        numero:40,
        nome:"Wigglytuff",
        tipo:"Normal",
        imagem:"/img/Wigglytuff.png",
        descricao:"The more air it takes in, the more it inflates. If opponents catch it in a bad mood, it will inflate itself to an enormous size to intimidate them.",
        altura:1,
        peso:12,
        categoria:"Balloon",
        habilidade:"Cute charm, Competitive",
    },
    {
        numero:156,
        nome:"Quilava",
        tipo:"Fire",
        imagem:"/img/Quilava.png",
        descricao:"Quilava keeps its foes at bay with the intensity of its flames and gusts of superheated air. This Pokémon applies its outstanding nimbleness to dodge attacks even while scorching the foe with flames.",
        altura:0.9,
        peso:19,
        categoria:"Volcano",
        habilidade:"Blaze",
    }
];

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded());

app.get("/", function(req, res) {
    
    res.render("index", {pokedex:pokedex,message:message});
});

app.get("/cadastro", function (req, res){
    res.render("cadastro");
});

app.post("/new", (req, res) => {
    const pokemon = req.body;
    pokedex.push(pokemon); 
    message = "Pokemon cadastrado com sucesso!";    
    res.redirect("/");
    
});

app.get("/detalhes/:id", (req, res) => {
    const id = req.params.id;
    const pokemon = pokedex[id];
    console.log(pokemon);
    res.render("detalhes", {pokemon:pokemon}
    );
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));