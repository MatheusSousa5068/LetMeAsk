import { ReactNode } from "react";

import "../styles/Questions.scss";

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
};

function Question(props: QuestionProps) {
    return (
        <div className="question">
            <p>{props.content}</p>

            <footer>
                <div className="user-info">
                    <img src={props.author.avatar} referrerPolicy="no-referrer" alt={props.author.name} />
                    <span>{props.author.name}</span>
                </div>

                <div>{props.children}</div>
            </footer>
        </div>
    );
}

export default Question;
