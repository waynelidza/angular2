export module RHelper {


//-------------------------------------------------------------------------------------------
    export function getTimeStamp():string {
        return new Date().toDateString() + " " + new Date().toTimeString();
    }
//-------------------------------------------------------------------------------------------
    export function doLog(val:string, blog:boolean){
        if(blog){
            console.log(`${val} ${this.getTimeStamp()}`);
        }
    }
//------------------------------------------------------------------------------------------
    export function getDefaultIndex(TheArray:any[],  Value:string): number{

        let res  = 0;

        for(let o of TheArray)
        {
            if(String(o.Defaultvalue) == Value)
            {
                break;
            }

            res++
        }

        return res;
    }
//------------------------------------------------------------------------------------------

}

