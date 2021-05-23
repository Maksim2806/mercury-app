export interface IServerError extends Error {
    code: number
    message: string
}
