import Navbar from "./Navbar";
import Contact from "./Navbar/Contact";
import Paypal from "./Navbar/Paypal";
import Tools from "./Navbar/Tools";
import Tool from "./Tool";

import "./app.scss";

function App() {
    const path = "https://micetf.fr";
    const tool = "miniUrl";

    return (
        <>
            <Navbar
                path={path}
                tool={tool}
                right={[
                    <Paypal />,
                    <Tools path={path} />,
                    <Contact tool={tool} />,
                ]}
            />
            <Tool />
        </>
    );
}

export default App;
