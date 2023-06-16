import { BsBoxArrowLeft, BsBoxArrowRight, BsMinecartLoaded } from "react-icons/bs";
import { MdOutlineSell } from "react-icons/md";


export const detailCardData = [
    {
        title: "Sales",
        desc: "Total Sales",
        amount: "10,000",
        icon: <MdOutlineSell size={20}/>
    },
    {
        title: "Purchase",
        desc: "Total Purchase",
        amount: "10,000",
        icon: <BsMinecartLoaded size={20}/>
    },
    {
        title: "S-Return",
        desc: "Total Sales Return",
        amount: "10,000",
        icon: <BsBoxArrowLeft size={20}/>
    },
    {
        title: "P-Return",
        desc: "Total Sales Amount",
        amount: "10,000",
        icon: <BsBoxArrowRight size={20}/>
    },
]