import { useEffect, useState } from "react";
import { UsersService } from "../services/users.service";

export function useAuthorName(authorId?: string) {
    const [name, setName] = useState<string>("")

    useEffect(() => {
        async function fetchAuthor() {
            if (!authorId) return

            const name = await UsersService.getNameOfUser(authorId);

            setName(name);
        }

        fetchAuthor();
    }, [authorId]);

    return name
}