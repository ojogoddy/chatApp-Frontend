export const baseUrl = "http://localhost:5000/api"

export const postRequest = async(url:any, body:any) =>{
    console.log(body)
 const response =   await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body
    })
    const data = await response.json()

    //if we have an error
    if(!response.ok){
        let message

        if(data?.messge){
            message = data.message
        }else{
            message = data
        }

        return {error: true, message}
    }
    return data;
}

export const getRequest = async(url:any) =>{
   const response = await fetch(url)

   const data = await response.json()
     //if we have an error
     if(!response.ok){
        let message = "An error occured..."

        if(data?.messge){
            message = data.message
        }

        return {error: true, message}
    }
    return data;
}
