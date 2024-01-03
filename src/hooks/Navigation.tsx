
import { useNavigate } from "react-router-dom";

const useGoNavigate = () => {

    const navigate = useNavigate();

    const navigateTo = ( path : string) => {
        navigate(`${path}`);
    }
    return { navigateTo };
}

export { useGoNavigate }