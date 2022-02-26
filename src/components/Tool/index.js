import axios from "axios";
import { useRef, useState } from "react";
import { YOURLS_ROOT, YOURLS_API, YOURLS_SIGNATURE } from "./config.js";
import modal from "bootstrap/js/dist/modal";
import Svg, { COPY } from "../Svg/index.js";

function verifierURL(url) {
    const res = url.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g
    );
    return res !== null;
}

function Tool() {
    const [lien, setLien] = useState("");
    const [texte, setTexte] = useState("");
    const [loading, setLoading] = useState(false);
    const [lienRaccourci, setLienRaccourci] = useState("");
    const modalRef = useRef(null);

    function handleButtonClick(e) {
        e.preventDefault();
        if (lien !== "" && verifierURL(lien) !== null) {
            setLoading(true);
            axios
                .get(YOURLS_API, {
                    params: {
                        signature: YOURLS_SIGNATURE,
                        action: "shorturl",
                        format: "json",
                        url: lien,
                        keyword: texte,
                    },
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then(function (response) {
                    setLienRaccourci(
                        "https://micetf.fr/urls/" + response.data.url.keyword
                    );
                    setLoading(false);
                    new modal(modalRef.current).show();
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }
    }
    function handleInputChange(e) {
        e.preventDefault();
        const value = e.target.value.trim();
        switch (e.target.name) {
            case "lien":
                setLien(value);
                break;
            case "texte":
                setTexte(value);
                break;
        }
    }
    function closeModal() {
        setLienRaccourci("");
    }

    return (
        <>
            <div className="container">
                <div className="d-flex flex-column justify-content-around vh-restant">
                    <div className="text-center">
                        <div className="h1">Créer un lien raccourci</div>
                        <div className="h2 text-muted fst-italic">
                            pour partager simplement une ressource en ligne
                        </div>
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control  form-control-lg"
                            placeholder="Lien à raccourcir"
                            value={lien}
                            name="lien"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">{YOURLS_ROOT}</span>
                        <input
                            type="text"
                            className="form-control  form-control-lg"
                            placeholder="Texte personnalisé (facultaitf)"
                            value={texte}
                            name="texte"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="container">
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={handleButtonClick}
                        >
                            Raccourcir
                        </button>
                    </div>
                </div>
            </div>
            <div
                ref={modalRef}
                className="modal fade"
                data-bs-backdrop="static"
                tabIndex="-1"
            >
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Lien raccourci</h3>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={closeModal}
                            ></button>
                        </div>
                        <div className="modal-body d-flex">
                            <div className="p-2">{lienRaccourci}</div>
                            <div
                                className="p-2 btn btn-primary ms-auto"
                                onClick={() =>
                                    navigator.clipboard
                                        .writeText(lienRaccourci)
                                        .then(() => {})
                                }
                            >
                                <Svg src={COPY} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tool;
