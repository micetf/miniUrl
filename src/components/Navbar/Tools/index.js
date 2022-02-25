import React from "react";
import Svg, { SEARCH } from "../../Svg";
export default ({ path }) => {
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = `${path}/outils`;
    const handleClick = (e) => {
        e.preventDefault();
        a.click();
    };

    return (
        <button
            className="btn btn-secondary my-1 mx-1"
            title="Chercher un outil sur micetf.fr..."
            onClick={handleClick}
        >
            <Svg src={SEARCH} />
        </button>
    );
};
