const apiUrl = "http://localhost:8080";

const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val
}

export {apiUrl, convertType}