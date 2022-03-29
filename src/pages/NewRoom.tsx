import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import illustration from "../assets/images/illustration.svg";
import logo from "../assets/images/logo.svg";

import "../styles/auth&newRoom.scss";

import Button from "../components/Button";

import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

function NewRoom() {
    const { user } = useAuth();

    const [newRoom, setNewRoom] = useState("");

    const navigate = useNavigate();

    async function handleNewRoom(e: FormEvent) {
        e.preventDefault();

        if (newRoom.trim() === "") {
            return;
        }

        const roonmRef = database.ref("rooms");

        const firebaseRoom = await roonmRef.push({
            title: newRoom,
            authorID: user?.id,
        });

        navigate(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img
                    src={illustration}
                    alt="Ilustração de perguntas e respostas"
                />

                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logo} alt="LetMeAsk" />

                    <h2 id="create">Crie uma nova sala</h2>

                    <form onSubmit={handleNewRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={(event) => setNewRoom(event.target.value)}
                            value={newRoom}
                        />

                        <Button type="submit">Criar sala</Button>
                    </form>

                    <p>
                        Quer entrar em uma sala existente?{" "}
                        <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default NewRoom;
