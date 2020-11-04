import {LuckyFile} from "./ToLuckySheet/LuckyFile";
import {HandleZip} from './HandleZip';
import {IuploadfileList} from "./ICommon";

// api
export class LuckyExcel{
    static transformExcelToLucky(excelFile:File, callBack?:(files:IuploadfileList, fs?:string)=>void){
        let handleZip:HandleZip = new HandleZip(excelFile);
        handleZip.unzipFile(function(files:IuploadfileList){
            let luckyFile = new LuckyFile(files, excelFile.name);
            let luckysheetfile = luckyFile.Parse();
            let exportJson = JSON.parse(luckysheetfile);
            if(callBack != undefined){
                callBack(exportJson, luckysheetfile);
            }

        },
        function(err:Error){
            console.error(err);
        });
    }

    static transformExcelToLuckyByUrl(url:string, name:string, callBack?:(files:IuploadfileList, fs?:string)=>void){
        let handleZip:HandleZip = new HandleZip(null);
        handleZip.unzipFileByUrl(url, function(files:IuploadfileList){
            let luckyFile = new LuckyFile(files, name);
            let luckysheetfile = luckyFile.Parse();
            let exportJson = JSON.parse(luckysheetfile);
            if(callBack != undefined){
                callBack(exportJson, luckysheetfile);
            }
        },
        function(err:Error){
            console.error(err);
        });
    }

    static transformLuckyToExcel(LuckyFile: any, callBack?: (files: string) => void) {

    }
}

// @ts-ignore
window["LuckyExcel"] = LuckyExcel



