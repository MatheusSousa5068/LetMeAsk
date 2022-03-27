import { Link } from "react-router-dom";

import illustration from "../assets/images/illustration.svg";
import logo from "../assets/images/logo.svg";

import "../styles/auth&newRoom.scss";

import Button from "../components/Button";

function NewRoom() {
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

                    <form>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                        />

                        <Button type="submit">Criar sala</Button>
                    </form>

                    <p>
                        Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default NewRoom;
