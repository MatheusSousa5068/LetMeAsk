import copyImg from "../assets/images/copy.svg";

import "../styles/RoomCode.scss";

type RoomCodeProps = {
    code: string
}

function RoomCode(props: RoomCodeProps) {
    function copyCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button className="room-code" onClick={copyCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    );
}

export default RoomCode;
