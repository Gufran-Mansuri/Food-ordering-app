import { Fragment } from "react/cjs/react.production.min";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

const Overlays = (props) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content} >{props.children}</div>
        </div>
    );
};

const Modals = (props) => {
    return (
        <Fragment>
            {ReactDom.createPortal(<Backdrop onClose={props.onClose}/>, document.getElementById("overlays"))}
            {ReactDom.createPortal(<Overlays>{props.children}</Overlays>, document.getElementById("overlays"))}
        </Fragment>
    )
};

export default Modals;