import { ReactNode } from "react";
import cx from "classnames";

import "../styles/Questions.scss";

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
};

function Question({
    content,
    author,
    isAnswered = false,
    isHighlighted = false,
    children,
}: QuestionProps) {
    return (
        <div 
            className={cx(
                'question',
                { answered: isAnswered},
                { highlighted: isHighlighted && !isAnswered}
            )}
        >
            <p>{content}</p>

            <footer>
                <div className="user-info">
                    <img
                        src={author.avatar}
                        referrerPolicy="no-referrer"
                        alt={author.name}
                    />
                    <span>{author.name}</span>
                </div>

                <div>{children}</div>
            </footer>
        </div>
    );
}

export default Question;
