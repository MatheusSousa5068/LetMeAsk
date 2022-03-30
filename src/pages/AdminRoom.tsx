import { useNavigate, useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";

import Button from "../components/Button";
import Question from "../components/Question";
import RoomCode from "../components/RoomCode";

import useRoom from "../hooks/useRoom";

import { database } from "../services/firebase";

import "../styles/Room.scss";

type RoomParams = {
    id: string;
};

function AdminRoom() {
    const params = useParams<RoomParams>();
    const roomID = params.id;
    const navigate = useNavigate()

    const { title, questions } = useRoom(roomID!);

    async function handleEndRoom() {
        await database.ref(`rooms/${roomID}`).update({
            endedAt: new Date()
        })

        navigate('/')
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm("Você tem certeza ue deseja excluir esta pergunta?")) {
            await database.ref(`rooms/${roomID}/questions/${questionId}`).remove()
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo da Aplicação" />
                    <div>
                        <RoomCode code={roomID!} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && (
                        <span>{questions.length} perguntas</span>
                    )}
                </div>

                <div className="question-list">
                    {questions.map((question) => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDeleteQuestion(question.id)
                                    }
                                >
                                    <img
                                        src={deleteImg}
                                        alt="Deletar pergunta"
                                    />
                                </button>
                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default AdminRoom;