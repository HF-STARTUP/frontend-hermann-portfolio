class Logger {
    private isEnabled: boolean;

    constructor() {
        this.isEnabled = process.env.NODE_ENV !== 'production';
    }

    log(message: any, ...optionalParams: any[]) {
        if (this.isEnabled) {
            console.log(message, ...optionalParams);
        }
    }

    info(message: any, ...optionalParams: any[]) {
        if (this.isEnabled) {
            console.info(message, ...optionalParams);
        }
    }

    warn(message: any, ...optionalParams: any[]) {
        if (this.isEnabled) {
            console.warn(message, ...optionalParams);
        }
    }

    error(message: any, ...optionalParams: any[]) {
        if (this.isEnabled) {
            console.error(message, ...optionalParams);
        }
    }

    setLogging(enabled: boolean) {
        this.isEnabled = enabled;
    }
}

export const logger = new Logger();
