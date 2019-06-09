export interface UpdateA {
    type: 'UpdateA'
    payload: { userId: string, id: number, title: string }
}

export type AppAction = UpdateA
