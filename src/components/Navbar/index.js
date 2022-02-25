import React from "react";
import Svg, { CHEVERON_RIGHT } from "../Svg";
import "bootstrap/js/dist/collapse";

const liRender = (item, index) => (
    <li key={index} className="nav-item">
        {item}
    </li>
);
export default ({
    tool,
    path,
    left = [],
    center = [],
    right = [] /*  = [<button className="btn btn-secondary my-1 mx-1">Right</button>] */,
}) => {
    return (
        <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark px-3">
            <a className="navbar-brand" href={path}>
                MiCetF
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarToggle"
                aria-controls="navbarToggle"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggle">
                <span className="navbar-text text-light mr-1">
                    <Svg src={CHEVERON_RIGHT} />
                </span>
                <a className="navbar-brand" href="#">
                    {tool}
                </a>
                <ul className="navbar-nav ml-2">{left.map(liRender)}</ul>
                <ul className="navbar-nav mx-auto">{center.map(liRender)}</ul>
                <ul className="navbar-nav ml-auto">{right.map(liRender)}</ul>
            </div>
        </nav>
    );
};
