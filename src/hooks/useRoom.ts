import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<
    string,
    {
        author: {
            name: string;
            avatar: string;
        };
        content: string;
        isAnswered: boolean;
        isHighlighted: boolean;
        likes: Record<
            string,
            {
                authorId: string;
            }
        >;
    }
>;

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeID: string | undefined;
};

function useRoom(roomID: string) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomID}`);

        roomRef.on("value", async (room) => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions =
                databaseRoom.questions ?? {};

            const parsedQuestions = await Object.entries(firebaseQuestions).map(
                ([key, value]) => {
                    Object.keys(value).map((value) => {
                        console.table(value);
                    });

                    return {
                        id: key,
                        content: value.content,
                        author: value.author,
                        isHighlighted: value.isHighlighted,
                        isAnswered: value.isAnswered,
                        likeCount: Object.values(value.likes ?? {}).length,
                        likeID: Object.entries(value.likes ?? {}).find(
                            ([key, like]) => like.authorId === user?.id
                        )?.[0],
                    };
                }
            );

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        });

        return () => {
            roomRef.off("value");
        };
    }, [roomID, user?.id]);

    return { questions, title };
}

export default useRoom;
