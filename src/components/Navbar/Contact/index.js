import React from "react";
import Svg, { ENVELOPE } from "../../Svg";

export default ({ tool }) => {
    const a = document.createElement("a");
    a.href = [
        "mailto",
        ":",
        "webmaster",
        "@",
        "micetf",
        ".",
        "fr",
        "?",
        "subject",
        "=",
        "A propos de /",
        tool,
    ].join("");
    const handleClick = (e) => {
        e.preventDefault();
        a.click();
    };

    return (
        <button
            className="btn btn-secondary my-1 mx-1"
            title="Pour contacter le webmaster..."
            onClick={handleClick}
        >
            <Svg src={ENVELOPE} />
        </button>
    );
};
