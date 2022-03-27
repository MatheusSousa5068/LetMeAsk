import React from "react";

import illustration from "../assets/images/illustration.svg";
import logo from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";

import "../styles/auth.scss";

import Button from "../components/Button";

function Home() {
    return (
        <div id="page-auth">
            <aside>
                <img
                    src={illustration}
                    alt="Ilustração de perguntas e respostas"
                />

                <strong>Crie salas de Q&amp;A ao-vivo</strong>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logo} alt="LetMeAsk" />
                    <button className="create-room">
                        <img src={googleIcon} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>

                    <div className="separator">ou entre em uma sala</div>

                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                    
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Home;
