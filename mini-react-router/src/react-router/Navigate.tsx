import { useEffect } from "react";

import { useNavigate } from "./Hooks";

const Navigate = (props: { to: string }) => {
    const { to } = props;
    const navigate = useNavigate();
    useEffect(() => {
        navigate?.(to);
    }, []);
    return null;
};

export default Navigate;
