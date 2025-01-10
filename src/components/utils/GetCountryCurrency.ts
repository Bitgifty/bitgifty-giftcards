export const GetCountryCurrency=(country:string)=>{
switch(country){
    case "NG":return "₦";
    case "GH":return "₵";
    case "KE":return "KSh";
    case "ZA":return "R";
    case "UG":return "USh";
    default: return "₦";
}
}