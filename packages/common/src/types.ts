import {z} from "zod"

export const Createuserschema=z.object({
    username:z.string().min(6).max(20),
    password:z.string(),
    name:z.string()
})

export const Signinschema=z.object({
      username:z.string().min(6).max(20),
      password:z.string()
})

export const Createroomschema=z.object({
    name:z.string().min(6).max(20)
})