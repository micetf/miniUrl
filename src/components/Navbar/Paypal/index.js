import React from "react";
import Svg, { HEART } from "../../Svg";

const PAYPAL_ID = "Q2XYVFP4EEX2J";

const renderButton = () => (
    <button
        className="btn btn-warning text-light my-1 mx-1"
        title="Si vous pensez que ces outils le méritent... Merci !"
        type="submit"
    >
        <Svg src={HEART} />
    </button>
);

const renderHiddenInput = () => (
    <>
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value={PAYPAL_ID} />
    </>
);

export default () => (
    <>
        <form
            action="https://www.paypal.com/cgi-bin/webscr"
            method="post"
            target="_top"
        >
            {renderButton()}
            {renderHiddenInput()}
        </form>
    </>
);
