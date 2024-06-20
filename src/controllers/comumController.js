const getBemVindo = (request, response) => {
    response.status(200).send("API do sistema de clinicas");
}

module.exports = {
    getBemVindo
}