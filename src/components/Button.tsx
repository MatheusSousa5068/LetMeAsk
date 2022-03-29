import { ButtonHTMLAttributes } from "react";

import '../styles/button.scss'

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button(props: buttonProps) {
    return <button className="button" {...props} />;
}

export default Button;