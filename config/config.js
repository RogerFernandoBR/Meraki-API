const env = process.env.NODE_ENV || "dev";

function config() {
    switch (env) {
    case "dev":
        return {
            bd_string: "mongodb+srv://admin:TmsGVFxFIZHd1cjI@servidorroger-wtgz0.mongodb.net/meraki?retryWrites=true",
            secret: "f9babcbd630b0963e718f07e4538c55b",
            expiresIn: "7d"
        };

    case "hml":
        return {
            bd_string: "",
            secret: "",
            expiresIn: "7d"

        };
    case "prod":
        return {
            bd_string: "",
            secret: "",
            expiresIn: "7d"

        };
    default:
        return {
            bd_string: "",
            secret: "",
            expiresIn: "7d"
        };
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();
