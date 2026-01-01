export interface ExecutionResult {
    output: string[]
    error?: string
}

export function runCode(code: string, language: string): ExecutionResult {
    const logs: string[] = []

    // Safe console override
    const safeConsole = {
        log: (...args: any[]) => logs.push(args.map(a => String(a)).join(' ')),
        error: (...args: any[]) => logs.push('Error: ' + args.map(a => String(a)).join(' ')),
        warn: (...args: any[]) => logs.push('Warn: ' + args.map(a => String(a)).join(' ')),
    }

    try {
        if (language === 'javascript' || language === 'typescript') {
            // create a function with safeConsole in scope
            // eslint-disable-next-line no-new-func
            const fn = new Function('console', code)
            fn(safeConsole)
        } else {
            logs.push(`Execution for ${language} is not supported in the browser yet.`)
        }
    } catch (err: any) {
        return { output: logs, error: err.message }
    }

    return { output: logs }
}
