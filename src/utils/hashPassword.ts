import { genSalt,hash } from "bcrypt";

export const hashPassword = async (password: string) => {
    const salt = await genSalt(10); // default saltnya 10
    return await hash(password,salt)
};


//kenapa dipisah? supaya bagian genSaltnya konsisten saat dibutuhkan di controller lain, sehingga tdk perlu satu2 definenya, konsistensi metode
