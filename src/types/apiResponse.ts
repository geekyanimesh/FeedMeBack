import { Message } from "@/model/User"

export interface ApiResponse{
    successs: boolean,
    message: string,
    isAcceptingMessages?: boolean,
    messages?: Array<Message>
}