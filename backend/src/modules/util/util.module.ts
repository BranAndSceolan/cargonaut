import config from "config";


export function printToConsole(s: any){
    if (config.get("debug")=="true") {
        console.log(s)
    }
}