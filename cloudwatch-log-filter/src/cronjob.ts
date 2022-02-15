async function handler(event:any){
    console.log("Job stated");
    console.log(event);
    console.log("Job ended")

    return {
        body:JSON.stringify({message:'SUCCESS'}),
        statusCode:200
    };
}

export {handler}