"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_handlebars_1 = require("express-handlebars");
const app = (0, express_1.default)();
// ToDo: remove row below when will start working with cors policy
app.use((0, cors_1.default)());
const fortunes = [
    "Победи свои страхи, или они победят тебя.",
    "Рекам нужны истоки.",
    "Не бойся неведомого.",
    "Тебя ждет приятный сюрприз.",
    "Будь проще везде, где только можно.",
];
const port = process.env.PORT || 3006;
app.engine("handlebars", (0, express_handlebars_1.engine)({
    defaultLayout: "main",
}));
app.set("view engine", "handlebars");
app.use(express_1.default.static("public"));
app.get("/", (_, res) => res.render("home"));
app.get("/about", (_, res) => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render("about", { fortune: randomFortune });
});
// Пользовательская страница 404
app.use((_, res) => {
    res.type("text/plain");
    res.render("404");
});
// Пользовательская страница 500
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render("500");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
