import { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

interface props{
    onClick: () => void
}


function Like({onClick}: props) {
    let [status, setStatus] = useState(false);

    const toggle = () => {
        setStatus(!status);
        onClick();
    };

    if (status)return <AiFillLike size={40} color="#ff6b81" onClick={toggle} />;
    return <AiOutlineLike size={40} onClick={toggle}/>
}

export default Like;
