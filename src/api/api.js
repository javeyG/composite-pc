import Axios from "@/utils/http";
function url(url,data){
    return Axios.fetch(url,data)
}

export default {
    url
}