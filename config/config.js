const env = process.env.NODE_ENV || "dev";

function config() {
    switch (env) {
    case "dev":
        return {
            bd_string: "mongodb+srv://admin:TmsGVFxFIZHd1cjI@servidorroger-wtgz0.mongodb.net/meraki?retryWrites=true",
            jwt_pass: "batataFrita"
        };

    case "hml":
        return {
            bd_string: "",
            jwt_pass: ""

        };
    case "prod":
        return {
            bd_string: "",
            jwt_pass: ""

        };
    default:
        return {
            bd_string: "",
            jwt_pass: ""
        };
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();
