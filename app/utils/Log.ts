

export interface ILogs {
    requestId: string
    device: Object
    clientIp: string
    path: string
    sessionId: string,
    username: string,
    customerId: string,
    step: number,
    processDuration: number
    logs: ILog[]
}

export interface ILog {
    logType: LogType,
    method: string,
    data: Object,
    step: number,
    stepTime: number
}





export enum LogType {
    REQUEST = "REQUEST",
    TRACING = "TRACING",
    RESPONSE = "RESPONSE",
    EXCEPTION = "EXCEPTION",
    CALL_GRPC = "CALL_GRPC",
    CALL_REST="CALL_REST"
}
