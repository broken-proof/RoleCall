export interface Test{
    id: string,
    name: string,
    anotherParam: string,
}

export type NewTest = Omit<Test, "id">;