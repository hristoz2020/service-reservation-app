interface ValidationError extends Error {
    errors: { [key: string]: { message: string } };
}

export function mapErrors(err: unknown): string {
    if (Array.isArray(err)) {
        return err.join('\n');
    } else if (isValidationError(err)) {
        return Object.values(err.errors).map(e => e.message).join('\n');
    } else if (isErrorWithMessage(err)) {
        return err.message;
    } else {
        return 'Request error';
    }
}

function isValidationError(err: unknown): err is ValidationError {
    return typeof err === 'object' && err !== null && 'name' in err && (err as Error).name === 'ValidationError';
}

function isErrorWithMessage(err: unknown): err is Error {
    return typeof err === 'object' && err !== null && 'message' in err && typeof (err as Error).message === 'string';
}